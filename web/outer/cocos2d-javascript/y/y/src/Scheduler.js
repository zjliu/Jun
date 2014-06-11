'use strict'

var util = require('util')

/** @ignore */
function HashUpdateEntry() {
    this.timers = []
    this.timerIndex = 0
    this.currentTimer = null
    this.currentTimerSalvaged = false
    this.paused = false
}

/** @ignore */
function HashMethodEntry() {
    this.timers = []
    this.timerIndex = 0
    this.currentTimer = null
    this.currentTimerSalvaged = false
    this.paused = false
}

/**
 * @class
 * Runs a function repeatedly at a fixed interval
 *
 * @memberOf cocos
 *
 * @opt {Function} callback The function to run at each interval
 * @opt {Float} interval Number of milliseconds to wait between each exectuion of callback
 */
function Timer (opts) {
    this.callback = opts.callback
    this.interval = opts.interval || 0
    this.elapsed = -1
}

Timer.inherit(Object, /** @lends cocos.Timer# */ {
    callback: null,
    interval: 0,
    elapsed: -1,

    /**
     * @private
     */
    update: function (dt) {
        if (this.elapsed == -1) {
            this.elapsed = 0
        } else {
            this.elapsed += dt
        }

        if (this.elapsed >= this.interval) {
            this.callback(this.elapsed)
            this.elapsed = 0
        }
    }
})

/**
 * @class
 * Runs the timers
 *
 * @memberOf cocos
 *
 * @singleton
 */
function Scheduler () {
    this.updates0 = []
    this.updatesNeg = []
    this.updatesPos = []
    this.hashForUpdates = {}
    this.hashForMethods = {}
}
Scheduler.inherit(Object, /** @lends cocos.Scheduler# */ {
    updates0: null,
    updatesNeg: null,
    updatesPos: null,
    hashForUpdates: null,
    hashForMethods: null,
    timeScale: 1.0,

    /**
     * The scheduled method will be called every 'interval' seconds.
     * If paused is YES, then it won't be called until it is resumed.
     * If 'interval' is 0, it will be called every frame, but if so, it recommened to use 'scheduleUpdateForTarget:' instead.
     * If the selector is already scheduled, then only the interval parameter will be updated without re-scheduling it again.
     */
    schedule: function (opts) {
        var target   = opts.target,
            method   = (typeof opts.method == 'function') ? opts.method : target[opts.method],
            interval = opts.interval,
            paused   = opts.paused || false

        var element = this.hashForMethods[target.id]

        if (!element) {
            element = new HashMethodEntry()
            this.hashForMethods[target.id] = element
            element.target = target
            element.paused = paused
        } else if (element.paused != paused) {
            throw "cocos.Scheduler. Trying to schedule a method with a pause value different than the target"
        }

        var timer = new Timer({callback: method.bind(target), interval: interval})
        element.timers.push(timer)
    },

    /**
     * Schedules the 'update' selector for a given target with a given priority.
     * The 'update' selector will be called every frame.
     * The lower the priority, the earlier it is called.
     */
    scheduleUpdate: function (opts) {
        var target   = opts.target,
            priority = opts.priority,
            paused   = opts.paused

        var i, len
        var entry = {target: target, priority: priority, paused: paused}
        var added = false

        if (priority === 0) {
            this.updates0.push(entry)
        } else if (priority < 0) {
            for (i = 0, len = this.updatesNeg.length; i < len; i++) {
                if (priority < this.updatesNeg[i].priority) {
                    this.updatesNeg.splice(i, 0, entry)
                    added = true
                    break
                }
            }

            if (!added) {
                this.updatesNeg.push(entry)
            }
        } else /* priority > 0 */{
            for (i = 0, len = this.updatesPos.length; i < len; i++) {
                if (priority < this.updatesPos[i].priority) {
                    this.updatesPos.splice(i, 0, entry)
                    added = true
                    break
                }
            }

            if (!added) {
                this.updatesPos.push(entry)
            }
        }

        this.hashForUpdates[target.id] = entry
    },

    /**
     * 'tick' the scheduler.
     * You should NEVER call this method, unless you know what you are doing.
     */
    tick: function (dt) {
        var i, len, x
        if (this.timeScale != 1.0) {
            dt *= this.timeScale
        }

        var entry
        for (i = 0, len = this.updatesNeg.length; i < len; i++) {
            entry = this.updatesNeg[i]
            if (entry && !entry.paused) {
                entry.target.update(dt)
            }
        }


        for (i = 0, len = this.updates0.length; i < len; i++) {
            entry = this.updates0[i]
            if (entry && !entry.paused) {
                entry.target.update(dt)
            }
        }

        for (i = 0, len = this.updatesPos.length; i < len; i++) {
            entry = this.updatesPos[i]
            if (entry && !entry.paused) {
                entry.target.update(dt)
            }
        }

        for (x in this.hashForMethods) {
            if (this.hashForMethods.hasOwnProperty(x)) {
                entry = this.hashForMethods[x]

                if (entry) {
                    for (i = 0, len = entry.timers.length; i < len; i++) {
                        var timer = entry.timers[i]
                        if (timer) {
                            timer.update(dt)
                        }
                    }
                }
            }
        }

    },

    /**
     * Unshedules a selector for a given target.
     * If you want to unschedule the "update", use unscheduleUpdateForTarget.
     */
    unschedule: function (opts) {
        if (!opts.target || !opts.method) {
            return
        }

        var target = opts.target,
            method = (typeof opts.method == 'function') ? opts.method : target[opts.method]

        var element = this.hashForMethods[opts.target.id]
        if (element) {
            for (var i=0; i<element.timers.length; i++) {
                // Compare callback function
                if (element.timers[i].callback == method.bind(target)) {
                    var timer = element.timers.splice(i, 1)
                    timer = null
                }
            }
        }
    },

    /**
     * Unschedules the update selector for a given target
     */
    unscheduleUpdateForTarget: function (target) {
        if (!target) {
            return
        }
        var id = target.id,
            elementUpdate = this.hashForUpdates[id]
        if (elementUpdate) {
            // Remove from updates list
            if (elementUpdate.priority === 0) {
                this.updates0.splice(this.updates0.indexOf(elementUpdate), 1)
            } else if (elementUpdate.priority < 0) {
                this.updatesNeg.splice(this.updatesNeg.indexOf(elementUpdate), 1)
            } else /* priority > 0 */{
                this.updatesPos.splice(this.updatesPos.indexOf(elementUpdate), 1)
            }
        }
        // Release HashMethodEntry object
        this.hashForUpdates[id] = null
    },

    /**
     * Unschedules all selectors from all targets.
     * You should NEVER call this method, unless you know what you are doing.
     */
    unscheduleAllSelectors: function () {
        var i, x, entry

        // Custom selectors
        for (x in this.hashForMethods) {
            if (this.hashForMethods.hasOwnProperty(x)) {
                entry = this.hashForMethods[x]
                this.unscheduleAllSelectorsForTarget(entry.target)
            }
        }
        // Updates selectors
        for (i = 0, len = this.updatesNeg.length; i < len; i++) {
            entry = this.updatesNeg[i]
            if (entry) {
                this.unscheduleUpdateForTarget(entry.target)
            }
        }

        for (i = 0, len = this.updates0.length; i < len; i++) {
            entry = this.updates0[i]
            if (entry) {
                this.unscheduleUpdateForTarget(entry.target)
            }
        }

        for (i = 0, len = this.updatesPos.length; i < len; i++) {
            entry = this.updatesPos[i]
            if (entry) {
                this.unscheduleUpdateForTarget(entry.target)
            }
        }
    },

    /**
     * Unschedules all selectors for a given target.
     * This also includes the "update" selector.
     */
    unscheduleAllSelectorsForTarget: function (target) {
        if (!target) {
            return
        }
        // Custom selector
        var element = this.hashForMethods[target.id]
        if (element) {
            element.paused = true
            element.timers = []; // Clear all timers
        }
        // Release HashMethodEntry object
        this.hashForMethods[target.id] = null

        // Update selector
        this.unscheduleUpdateForTarget(target)
    },

    /**
     * Pauses the target.
     * All scheduled selectors/update for a given target won't be 'ticked' until the target is resumed.
     * If the target is not present, nothing happens.
     */

    pauseTarget: function (target) {
        var element = this.hashForMethods[target.id]
        if (element) {
            element.paused = true
        }

        var elementUpdate = this.hashForUpdates[target.id]
        if (elementUpdate) {
            elementUpdate.paused = true
        }
    },

    /**
     * Resumes the target.
     * The 'target' will be unpaused, so all schedule selectors/update will be 'ticked' again.
     * If the target is not present, nothing happens.
     */
    resumeTarget: function (target) {
        var element = this.hashForMethods[target.id]
        if (element) {
            element.paused = false
        }

        var elementUpdate = this.hashForUpdates[target.id]
        //console.log('foo', target.id, elementUpdate)
        if (elementUpdate) {
            elementUpdate.paused = false
        }
    }
})

Object.defineProperty(Scheduler, 'sharedScheduler', {
    /**
     * A shared singleton instance of cocos.Scheduler
     *
     * @memberOf cocos.Scheduler
     * @getter {cocos.Scheduler} sharedScheduler
     */
    get: function () {
        if (!Scheduler._instance) {
            Scheduler._instance = new this()
        }

        return Scheduler._instance
    }

  , enumerable: true
})

exports.Timer = Timer
exports.Scheduler = Scheduler

// vim:et:st=4:fdm=marker:fdl=0:fdc=1
