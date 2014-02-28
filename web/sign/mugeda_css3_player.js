if (typeof Mugeda == "undefined") Mugeda = {};
Mugeda.data = Mugeda.data || {};
Mugeda.script = Mugeda.script || [];
Mugeda.customScript = '';
Mugeda.scene = undefined;
Mugeda.unzipAniData = function (data) {
    var uncompressAniData = function (compressed) {
        // 解压并返回解压后的JSON数据。
        var data = MugedaCompress.unzip(compressed);
        if (data.script && data.script.length)
            data.script = unescape(data.script)
        return data;
    }
    return uncompressAniData(data);
};
Mugeda.getFrameLength = function (layers) {
    var frameLenth = 1;
    for (var i = layers.length - 1; i >= 0; i--) {
        var layer = layers[i];
        var unitCount = layer.units.length;
        for (var j = 0; j < unitCount; j++) {
            var tmUnit = layer.units[j];
            var len = tmUnit.frameStart + tmUnit.frameCount;
            if (frameLenth < len) frameLenth = len;
        }
    }
    return frameLenth;
};

Mugeda.getWindowSize = function () {
    var docEl = document.documentElement,
        IS_BODY_ACTING_ROOT = docEl && docEl.clientHeight === 0;

    // Used to feature test Opera returning wrong values 
    // for documentElement.clientHeight. 
    function isDocumentElementHeightOff() {
        var d = document,
            div = d.createElement('div');
        div.style.height = "2500px";
        d.body.insertBefore(div, d.body.firstChild);
        var r = d.documentElement.clientHeight > 2400;
        d.body.removeChild(div);
        return r;
    }

    if (typeof document.clientWidth == "number") {
        return { width: document.clientWidth, height: document.clientHeight };
    } else if (IS_BODY_ACTING_ROOT || isDocumentElementHeightOff()) {
        var b = document.body;
        return { width: b.clientWidth, height: b.clientHeight };
    } else {
        return { width: docEl.clientWidth, height: docEl.clientHeight };
    }
};

Mugeda.updateViewport = function (data, fullView) {
    _mrmcp = (typeof _mrmcp == 'undefined') ? {} : _mrmcp;
    if (_mrmcp['render_mode'] == "embedded")
        return;

    var data = data || {
        width: 320,
        height: 480
    };

    var sz = Mugeda.getWindowSize();

    var srcRatio = data.width / data.height;
    var desRatio = sz.width / sz.height;
    var w = data.width;

    if (fullView) {
        if (srcRatio > desRatio)
            w = data.width;
        else
            w = Math.floor(sz.width * data.height / sz.height);
    }

    var viewport = document.querySelector("meta[name=viewport]");

    if (window.previousMugedaViewportWidth == w)
        return { window: [sz.width, sz.height], stage: [data.width, data.height] };

    window.previousMugedaViewportWidth = w;

    if (viewport)
        viewport.setAttribute('content', 'width=' + w + (Mugeda.isAndroid && Mugeda.androidVersion > 3.5 ? ",user-scalable=no" : ""));
    else {
        var meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = 'width=' + w + (Mugeda.isAndroid && Mugeda.androidVersion > 3.5 ? ",user-scalable=no" : "");
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
    return { window: [sz.width, sz.height], stage: [data.width, data.height] };
};


Mugeda.getCanvas = function () {
    return document.getElementsByClassName("MugedaStage")[0];
};

Mugeda.randPlus = 0;
Mugeda.guidGen = function () {
    var num = (new Date() - new Date('2012/1/1')) + '' + Math.random().toString().substr(2, 4)
    return Number(num).toString(36) + '' + (Mugeda.randPlus++);
};

Mugeda.getMugedaObject = function (id) {
    return Mugeda.scene;
};

Mugeda.loadUrl = function (params) {
    return MugedaMraid.loadUrl(params);
};

Mugeda.enable3DRendering = function (enable) {
    if (enable == undefined) enable = false;
    this.threeDRendering = enable;
}
Mugeda.showFPS = function () {
    Mugeda.FPSMeter = true;
}
Mugeda.enableNonDisplay = function (enable) {
    if (enable == undefined) enable = false;
    this.nonDisplay = enable;
}

Mugeda.enableFlexibleFrameRate = function (enable) {
    if (enable == undefined) enable = false;
    this.flexibleFrameRate = enable;
}

Mugeda.enablePulseAnimation = function (enable) {
    if (enable == undefined) enable = false;
    Mugeda.enablePulse = enable;
}



Mugeda.log = function (info) {
    if (!Mugeda.logConsole) {
        Mugeda.logConsole = document.createElement('div');
        Mugeda.logConsole.style.display = "block";
        Mugeda.logConsole.style.position = "fixed";
        Mugeda.logConsole.style.background = "#000";
        Mugeda.logConsole.style.color = "#FFF";
        Mugeda.logConsole.style.left = 0;
        Mugeda.logConsole.style.top = 0;
        document.body.appendChild(Mugeda.logConsole);
    }

    if (typeof info == "string" || info)
        Mugeda.logConsole.innerHTML = info;

    return Mugeda.logConsole.innerHTML;
}

Mugeda.getAudioCache = function (url, id) {
    return Mugeda.currentAni.audioBeList[id];
}

window.MugedaCss3 = (function (father) {
    if (father) return;

    Mugeda.customScript = "";

    var m = function (param) {
        if (/^<.+>$/.test(param)) {     // 建立新的dom
            return document.createElement(param.match(/^<(.+)>$/)[1]);
        }
        else if (/^#.+/.test(param)) {  // 返回id的dom
            return document.getElementById(param.match(/^#(.+)/)[1]);
        }
    }

    m.stage = {};

    m.getAnimation = function (name) {
        return m.stage[name];
    }

    // 初始化动画，data为aniData数据，d_stage为动画div，loadOverCallback为动画图片加载完成后的回调
    m.initAnimation = function (data, scriptName, d_stage, resDir, loadOverCallback) {
        var ca = new css3Ani(data, scriptName, d_stage, resDir);
        Mugeda.currentAni = ca;
        ca.initDom(loadOverCallback);
        return ca;
    }

    m.getCssBackgroundColor = function (param) {
        var fill = param.fillInfo;
        if (fill.fillStyle == 0) {
            return "rgba(" + fill.fillColors[0].r + "," + fill.fillColors[0].g + "," + fill.fillColors[0].b + "," + fill.fillColors[0].a + ")";
        }
        else if (fill.fillStyle == 1 || fill.fillStyle == 2) {
            var stx = fill.fillStartPos.x,
                sty = fill.fillStartPos.y,
                edx = fill.fillEndPos.x,
                edy = fill.fillEndPos.y,
                w = param.rawWidth || param.width,
                h = param.rawHeight || param.height,
                sita = Math.atan2(edy - sty, edx - stx),
                rotate = function (x, y, sita) { return { x: x * Math.cos(sita) - y * Math.sin(sita), y: x * Math.sin(sita) + y * Math.cos(sita) }; },
                p1 = { x: 0, y: 0 }.x,
                p2 = rotate(0, h, -sita).x,
                p3 = rotate(w, h, -sita).x,
                p4 = rotate(w, 0, -sita).x,
                ps = rotate(stx, sty, -sita).x,
                pe = rotate(edx, edy, -sita).x,
                pmax = Math.max(p1, p2, p3, p4),
                pmin = Math.min(p1, p2, p3, p4),
                midPoint = function (x1, x2, y1, y2, x) { return (y2 - y1) / (x2 - x1) * (x - x1) + parseFloat(y1); },
                percent = function (x) { return midPoint(pmin, pmax, 0, 100, x); },
                midColor = function (col1, col2, pm) {
                    var col = {};
                    col.pm = pm;
                    col.r = midPoint(col1.pm, col2.pm, col1.r, col2.r, pm);
                    col.g = midPoint(col1.pm, col2.pm, col1.g, col2.g, pm);
                    col.b = midPoint(col1.pm, col2.pm, col1.b, col2.b, pm);
                    col.a = midPoint(col1.pm, col2.pm, col1.a, col2.a, pm);
                    return col;
                },
                colStr = function (col, percent) { return "rgba(" + Math.round(col.r) + "," + Math.round(col.g) + "," + Math.round(col.b) + "," + col.a + ") " + (percent == undefined ? col.pm : percent) + "%"; };
            if (fill.fillStyle == 1) {
                fill.fillColors.m_operate(function (fillColor) {
                    fillColor.pm = percent(ps + (pe - ps) * fillColor.p);
                });
                var minFound = false, maxFound = false, colText = "";
                for (var i = 0; i < fill.fillColors.length; i++) {
                    var fillColor = fill.fillColors[i],
                        pm = fillColor.pm;
                    if (!minFound) {
                        if (pm < 0) {
                            // 对左点在外面的情况
                            if (i < fill.fillColors.length - 1) {
                                // 对后面一点存在的情况
                                if (fill.fillColors[i + 1].pm < 0) continue;
                                else colText += ", " + colStr(midColor(fillColor, fill.fillColors[i + 1], 0));
                            }
                            else {
                                colText += ", " + colStr(fillColor, 0);
                                colText += ", " + colStr(fillColor, 100);
                            }
                        }
                        else {
                            colText += ", " + colStr(fillColor, 0);
                            colText += ", " + colStr(fillColor);
                        }
                        minFound = true;
                    }
                    else {
                        if (pm < 100) {
                            colText += ", " + colStr(fillColor);
                            if (i == fill.fillColors.length - 1) {
                                colText += ", " + colStr(fillColor, 100);
                                break;
                            }
                        }
                        else {
                            colText += ", " + colStr(midColor(fillColor, fill.fillColors[i - 1], 100), 100);
                            break;
                        }
                    }

                }

                colText = "linear-gradient(" + (m.browser.msie ? sita * 180 / Math.PI + 90 : -sita * 180 / Math.PI) + "deg" + colText + ")";
            }
            else if (fill.fillStyle == 2) {
                var length = Math.sqrt(Math.pow(stx - edx, 2) + Math.pow(sty - edy, 2));
                colText = "";
                for (var i = 0; i < fill.fillColors.length; i++) {
                    colText += ", " + colStr(fill.fillColors[i], fill.fillColors[i].p * 100);
                }

                colText = "radial-gradient(" + (stx / w * 100) + "% " + (sty / h * 100) + "%, " + length + "px " + length + "px" + colText + ")";
            }

            return m.css3Per ? m.css3Per.toLowerCase() + colText : colText;
        }
        else return "transparent";
    }

    var isParent = function (obj, parentObj) {
        while (obj != undefined && obj.tagName != null && obj.tagName.toUpperCase() != 'BODY') {
            if (obj == parentObj) {
                return true;
            }
            obj = obj.parentNode;
        }
        return false;
    }

    m.handleCapture = function (event) {
        if (event.redirected) return;
        if (m.captureObject == null) return;
        //if (event.type == "mousedown") debugger;
        //if (isParent(event.srcElement, m.captureObject.object) || event.srcElement === m.captureObject.object) {
        //    if (event.type == "mouseup") m.captureObject.object.m_releasecapture();
        //    return;
        //}
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(event.type, true, event.cancelable, event.view, event.detail, event.screenX, event.screenY, event.clientX, event.clientY, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button, event.relatedTarget)
        evt.redirected = true;
        m.captureObject.object.dispatchEvent(evt);
        //m.captureObject.capture && event.stopPropagation();
        if (event.type == "mouseup" && m.captureObject) m.captureObject.object.m_releasecapture();
    }

    m.getCurrentStyle = function (ele, attr) {
        if (document.defaultView) {
            var style = document.defaultView.getComputedStyle(ele, null);
            return style ? style.getPropertyValue(attr) : null;
        } else {
            return ele.currentStyle[attr];
        }
    }

    m.getEventPosition = function (event, offsetDom) {
        var curX, curY;
        if (event.changedTouches) {
            var t = event.changedTouches[0];

            if (t == null) return null;

            curX = t.clientX;
            curY = t.clientY;
        } else {
            curX = event.clientX;
            curY = event.clientY;
        }

        if (offsetDom) {
            var obj = offsetDom;
            var top = 0;
            var left = 0;
            while (obj && obj.tagName != 'BODY') {
                top += obj.offsetTop;
                left += obj.offsetLeft;
                obj = obj.offsetParent;
            }
            var curX = curX - left + window.pageXOffset - parseInt(m.getCurrentStyle(offsetDom, "border-left-width"));;
            var curY = curY - top + window.pageYOffset - parseInt(m.getCurrentStyle(offsetDom, "border-top-width"));
        }

        return {
            'x': curX,
            'y': curY
        };
    };

    var w = window;
    (function () {
        var perf = w.performance;
        if (perf && (perf.now || perf.webkitNow)) {
            var perfNow = perf.now ? 'now' : 'webkitNow';
            m.getTime = perf[perfNow].bind(perf);
        } else {
            m.getTime = function () {
                return +new Date();
            };
        }
    }());
    var userAgent = navigator.userAgent.toLowerCase(),
        browser = {
            version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
            safari: /webkit/.test(userAgent),
            opera: /opera/.test(userAgent),
            msie: (/msie/.test(userAgent) || /trident/.test(userAgent)) && !/opera/.test(userAgent),
            mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent) && !/trident/.test(userAgent)
        }
    m.browser = browser;
    if (browser.safari) { m.css3Per = "-webkit-"; m.css3PerH = "webkit"; }
    else if (browser.opera) { m.css3Per = "-o-"; m.css3PerH = "o"; }
    else if (browser.msie) { m.css3Per = ""; m.css3PerH = ""; }//"ms";
    else if (browser.mozilla) { m.css3Per = "-moz-"; m.css3PerH = "Moz"; }



    var css3Ani = function (data, script, d_stage, resDir) {
        this.aniData = data = data.zip ? Mugeda.unzipAniData(data) : data;
        this.title = data.title;
        this.width = data.width;
        this.height = data.height;
        this.dom = d_stage;
        this.rate = data.rate;
        this.frameTime = 1000 / data.rate;
        this.frameTimeString = this.frameTime + "ms";

        this.sceneHash = {};   // 所有scene的hash
        this.mainSceneFrameUnitHash = {};
        this.zoneCached = {};
        this.event = {};
        this.stopRedraw = false;
        this.resDir = resDir;
        this.scriptFile = ("string" == typeof (script) ? script : null);

        this.frameParamCache = {}; // 在非变帧率下的param缓存

        this.paramUpdatePool = {};

        this.audioList = {};
        this.scriptList = []; // 保存需要预先加载的script
        if (Mugeda.zoneCache) {
            this.zoneCachedMode = true;
            this.zoneStart = Mugeda.zoneCache[0];
            this.zoneEnd = Mugeda.zoneCache[1];
        }

        Mugeda.updateViewport(this.aniData);
        setTimeout(function () {
            window.scroll(0, 0);
        }, 100);
    }

    css3Ani.prototype.getScene = function (name) {
        return this.scene;
    }

    var systemMouseEvent = 1,
        myMouseEvent = 2;
    var domMouseEvent = {
        mousedown: systemMouseEvent,
        mouseup: systemMouseEvent,
        click: systemMouseEvent,
        dblclick: systemMouseEvent,
        mouseover: systemMouseEvent,
        mouseout: systemMouseEvent,
        mousemove: systemMouseEvent,
        touchstart: systemMouseEvent,
        touchmove: systemMouseEvent,
        touchend: systemMouseEvent,
        inputstart: myMouseEvent,
        inputmove: myMouseEvent,
        inputend: myMouseEvent
    }

    var useTouch = navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i);
    var isAndroid = window.navigator.userAgent.indexOf('Android') >= 0;

    var addEventListener = function (type, callback, capture) {
        if (type == "inputstart") type = useTouch ? "touchstart" : "mousedown";
        else if (type == "inputmove") type = useTouch ? "touchmove" : "mousemove";
        else if (type == "inputend") type = useTouch ? "touchend" : "mouseup";
        if (domMouseEvent[type] == systemMouseEvent && this.dom) {
            var me = this;
            var funObj = {
                fun: callback,
                dir: function (event) {
                    event.postionGotton = false;
                    if (event.inputX == undefined) {
                        Object.defineProperty(event, "inputX", {
                            get: function () {
                                return m.getEventPosition(event, me.thisAni.scene.dom).x
                            }

                        });
                        Object.defineProperty(event, "inputY", {
                            get: function () {
                                return m.getEventPosition(event, me.thisAni.scene.dom).y;

                            }
                        });
                    }

                    //if (m.captureObject != null && m.captureObject.capture == false && isParent(event.srcElement, me.dom)) { return; }
                    callback.call(me, event);
                }
            }
            if (this.event[type]) this.event[type].push(funObj);
            else this.event[type] = [funObj];
            this.dom.addEventListener(type, funObj.dir, capture || false);
        }
        else {
            if (this.event[type]) this.event[type].push(callback);
            else this.event[type] = [callback];
        }
        return this;
    }

    var removeEventListener = function (type, callback, capture) {
        if (type == "inputstart") type = useTouch ? "touchstart" : "mousedown";
        else if (type == "inputmove") type = useTouch ? "touchmove" : "mousemove";
        else if (type == "inputend") type = useTouch ? "touchend" : "mouseup";
        if (domMouseEvent[type] == systemMouseEvent && this.dom) {
            if (this.event[type]) {
                for (var i = this.event[type].length - 1; i >= 0; i--) {
                    if (this.event[type][i].fun && this.event[type][i].fun == callback) {
                        this.dom.removeEventListener(type, this.event[type][i].dir, capture || false);
                        this.event[type].splice(i, 1);
                    }
                }
                if (this.event[type].length == 0) delete this.event[type];
            }
        }
        else {
            if (this.event[type]) {
                for (var i = this.event[type].length - 1; i >= 0; i--) {
                    if (this.event[type][i] == callback) this.event[type].splice(i, 1);
                }
                if (this.event[type].length == 0) delete this.event[type];
            }
        }
        return this;
    }

    var callEvent = function (type, param1, param2, param3, param4) {
        if (this.event[type]) {
            var eve = [];
            for (var i = 0; i < this.event[type].length; i++) {
                eve[i] = this.event[type][i];
            }
            for (var i = 0; i < eve.length; i++) {
                eve[i].call(this, param1, param2, param3, param4);
            }
        }
    }

    css3Ani.prototype.addEventListener = addEventListener;
    css3Ani.prototype.removeEventListener = removeEventListener;

    // 建立dom
    css3Ani.prototype.initDom = function (loadOverCallback) {
        if (!this.aniData || !this.dom) return;
        this.thisAni = this;
        this.countDownRef = 0;
        this.imageCache = [];
        this.maxNum = 0;
        this.loadOver = loadOverCallback;
        var data = this.aniData,
            stage = this.dom,
            thisAni = this;

        function iOSversion() {
            var re = {};
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                re.version = parseInt(v[1], 10) + 0.1 * parseInt(v[2], 10);
            }

            return re;
        }
        thisAni.iOS = iOSversion();
        
        var loadAudio = function (url) {
            var audioDom = null;
            if (window.weixinAudioLoader && window.weixinAudioLoader[url]) {
                audioDom = window.weixinAudioLoader[url];
            }
            else {
                audioDom = new Audio(url);
                audioDom.load();
            }
            /*
            audioDom._loop = audioDom.loop;
            audioDom.loop = false;
            Object.defineProperty(audioDom, 'loop', {
                set: function (val) {
                    audioDom._loop = val;
                },
                get: function () {
                    return audioDom._loop;
                }
            })
            */
            audioDom.addEventListener('ended', function () {
                if (audioDom.loop) {
                    audioDom.currentTime = 0;
                    audioDom.play();
                }
            });
            return audioDom;
        }

        /*
        function monitorAudioLoad() {
            if (thisAni.iOS.version < 5.9)
                return;

            document.body.addEventListener('touchstart', function (e) {
                setTimeout(function () {
                    for (var hash in thisAni.audioList) {
                        var audio = thisAni.audioList[hash];
                        if (audio.loadStatus == 1 || audio.loadStatus == 2)
                            // Still loading. Don't do anything
                            break;
                        if (audio.src && !audio.loadStatus) {
                            audio.load();
                            audio.loadStatus = 1;
                            if (thisAni.iOS)
                                // Work around: on iOS only buffer the first audio
                                break;
                        }
                    }
                }, 500);
            });
        }
        try {
            var audioctx;
            if (typeof AudioContext !== "undefined") {
                audioctx = new AudioContext();
            } else if (typeof webkitAudioContext !== "undefined") {
                audioctx = new webkitAudioContext();
            } else {
                console.log('AudioContext not supported. :(');
                throw new Error('AudioContext not supported. :(');
            }
        }
        catch (ex) { };
        var loadAudio = function (url) {
            thisAni.hasAPIAudio = true;
            if (location.host && audioctx) {
                thisAni.countDownRef++;
                thisAni.maxNum = thisAni.countDownRef;
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.responseType = "arraybuffer";
                var audio = {};
                audio.loadStatus = 0;
                var buffer = null;
                req.onload = function () {
                    try {
                        buffer = audioctx.createBuffer(req.response, false);
                    } catch (e) {
                        console.log("Error in createBuffer() for " + url + " with information: " + e.message);
                    }
                    thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                    thisAni.checkCountDownRef();
                    var src = audioctx.createBufferSource();
                    audio.loadStatus = 1;
                    audio.source = src;
                    audio.src = url;
                    audio.play = function (restart) {
                        // If already playing, ignore. 
                        if (audio.status == 'playing' && !restart && src.playbackState != src.FINISHED_STATE)
                            return false;

                        if (restart || src.playbackState > 0) {
                            audio.pause();
                            src = audioctx.createBufferSource();
                            audio.source = src;
                            audio.src = url;
                        }
                        if (buffer) {
                            src.buffer = buffer;
                            src.connect(audioctx.destination);
                            src.noteOn(0);
                            audio.status = 'playing';
                        }

                        return true;
                    };
                    audio.pause = function () {
                        if (src && audio.status && audio.status != 'paused') {
                            src.noteOff(0);
                            audio.status = 'paused';
                        }
                    };
                    audio.load = function () {
                        // audio.play();
                        // audio.pause();
                    };
                    Object.defineProperty(audio, "loop", {
                        get: function () { return audio.source.loop },
                        set: function (value) {
                            audio.source.loop = value;
                        }
                    });
                    audio.webAudio = true;
                    return audio;
                }
                req.onerror = function () {
                    thisAni.checkCountDownRef();
                }
                req.send();
                return audio;
            }
            else {
                var audio = new Audio();
                audio.preload = useTouch ? 'none' : 'auto';
                audio.src = url;
                audio.loadStatus = 0;
                thisAni.imageCache.push(audio);

                if (!thisAni.firstAudioProcessed) {
                    thisAni.countDownRef++;
                    // Ugly workaround for iOS (only one audio can be buffered)
                    thisAni.firstAudioProcessed = true;
                }

                thisAni.maxNum = thisAni.countDownRef;
                audio.addEventListener('canplay', function () {
                    thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                    thisAni.checkCountDownRef();
                    audio.loadStatus = 2;
                });

                audio.addEventListener('canplaythrough', function () {
                    audio.loadStatus = 3;
                    if (thisAni.iOS && !thisAni.audioMonitored) {
                        thisAni.audioMonitored = true;
                        monitorAudioLoad();
                    }
                });

                var ticker = 250;
                var maxCount = Math.floor(15000 / ticker); // 15 second maximum
                var checkedCount = 0;
                audio.checkAudioLoad = function () {
                    if (audio.error) {
                        console.log('error while loading ' + audio.src + ' with error information: ' + JSON.stringify(audio.error));
                        audio.loadStatus = -1;
                        if (thisAni.countDownRef)
                            --thisAni.countDownRef;
                    }

                    if (thisAni.countDownRef <= 0) {
                        thisAni.checkCountDownRef(true);
                    }
                    else {
                        if (++checkedCount == maxCount) {
                            Mugeda.log("Time out in loading audio: " + audio.src);
                            audio.loadStatus = -2;
                            setTimeout(function () {
                                Mugeda.log("");
                            }, 3000);
                            thisAni.checkCountDownRef();
                        }
                        setTimeout(function () { audio.checkAudioLoad() }, ticker);
                    }
                }

                if (audio.preload == "auto")
                    setTimeout(function () { audio.checkAudioLoad() }, ticker);

                return audio;
            }
        }

        this.cacheAudio = loadAudio;
        */

        // 场景对象
        var Scene = function (id, data, playing, currentId, offset, dom, isSymbol, parentScene, thisObj) {
            this.id = id; // 场景名称 _main, 或者是symbolId
            this.data = data; // 场景对于的anidata
            this.length = Mugeda.getFrameLength(data.layers);
            this.playing = playing;
            this.currentId = null; // 当前帧号
            this.nextId = 0;
            this.offset = offset;   // 用于元件的偏移
            this.dom = dom; // 场景对应的dom元素
            this.layerList = []; // 场景中的层数组
            this.objectHash = {}; // 场景中所有物体的hash表，但不深入元件中
            this.unitHash = []; // 场景中所有unit的hash表，但不深入元件中
            this.isSymbol = isSymbol; // 是否为元件scene
            this.clickEventAttached = {}; // 为防止重复绑定事件，记录下已经绑定click事件Object
            this.nameHash = {};     // 所有带名字的物体hash
            this.scriptHash = {};   // 所有采用API创建的物体
            this.segment = {};      // segment
            this.currentSegment = {};
            thisAni.sceneHash[this.id] = this;
            this.event = {};
            this.frameout = [];
            this.thisAni = thisAni;
            this.parentScene = parentScene;
            this.cachedVisibility = {};
            this.lastRenderList = {};
            this.frameLength = 0;
            if (isSymbol) {
                this.object = thisObj;
            }
            var cacheId = isSymbol ? data.id : '_main';
            thisAni.frameParamCache[cacheId] = thisAni.frameParamCache[cacheId] || {};
            this.frameParamCache = thisAni.frameParamCache[cacheId];
        }

        Scene.prototype.getObjectByName = function (name) {
            return this.nameHash[name];
        }

        Scene.prototype.initAndGetDom = function () {
            var that = this;

            that.data.layers.m_operate(function (layerData, layerIndex) {
                var layer = new Layer(layerData, that)
                that.layerList.push(layer);
                layer.initAndGetDom(that.dom);
            }, true);
            //if(that.id=="_main") debugger
        }

        // 播放
        Scene.prototype.play = function () {
            this.playing = true;
            thisAni.stopRedraw = false;
            return this;
        }

        // 暂停
        Scene.prototype.pause = function () {
            // return this; 
            this.pauseFlag = true;
            this.playing = false;
            callEvent.call(this, "pause");
            return this;
        }

        Scene.prototype.gotoAndPlay = function (id) {
            this.gotoFlag = true;
            this.nextId = id;
            return this.play();
        }

        Scene.prototype.gotoAndPause = function (id) {
            this.nextId = id;
            this.gotoFlag = true;
            //var _pause = function () {
            //    // 每当block播放到第一帧暂停
            //    if (this.currentId == id+1) {
            //        this.removeEventListener("beforedraw", _pause).pause();
            //    }
            //}

            //return this.addEventListener("beforedraw", _pause); 
            return this.pause();
        }

        Scene.prototype.setSegment = function (name, from, to, isLoop) {
            this.segment[name] = { from: Math.min(from, this.length), to: Math.min(to, this.length), isLoop: isLoop };
            return this;
        }

        Scene.prototype.playSegment = function (name) {
            if (this.currentSegment = this.segment[name]) this.gotoAndPlay(this.currentSegment.from);
            return this;
        }

        Scene.prototype.setFrameout = function (frame, callback) {
            var pos = this.frameout.length, t = 0;
            for (var i = 0; i < this.frameout.length; i++) {
                var f = this.frameout[i];
                if (t + f.time > frame) {
                    pos = i;
                    break;
                }
                t += f.time;
            }
            this.frameout.splice(pos, 0, { time: frame - t, fun: callback });
            return this;
        }

        Scene.prototype.removeChild = function (obj) {
            // 在anidata中删除
            if (obj.unit) {
                var anidataParent = obj.unit.data.objects;
                if (obj.parentGroup) {
                    anidataParent = obj.parentGroup.data;
                }
                anidataParent.m_operate(function (objectData, index) {
                    if (objectData.guid == obj.id) {
                        anidataParent.splice(index, 1);
                        return false;
                    }
                });
            }
            // 在dom中删除
            obj.dom.parentNode.removeChild(obj.dom);
            // 删除名字
            if (this.nameHash[obj.name]) delete this.nameHash[obj.name];
            // 在实例中删除
            delete this.objectHash[obj.id];
            if (this.scriptHash[obj.id]) delete this.scriptHash[obj.id];
                // cachedVisibility中删除
            else {
                var start = obj.unit ? obj.unit.data.frameStart : 0;
                var end = obj.unit ? obj.unit.data.frameStart + obj.unit.data.frameCount : obj.currentScene.frameLength - 1;
                var sceneVisCache = this.cachedVisibility;
                setTimeout(function () {
                    for (var i = start; i <= end; i++) {
                        var length = sceneVisCache[i].length;
                        for (var j = 0; j < length; j++) {
                            if (sceneVisCache[i][j].id == obj.id) {
                                sceneVisCache[i].splice(j, 1);
                                break;
                            }
                        }
                    }
                }, 0);
            }

            return this;
        }

        Scene.prototype.appendChild = function (obj, behindObj) {
            if (obj.name && this.nameHash[obj.name]) {
                throw "object name: " + obj.name + " had been used";
                return;
            }
            this.nameHash[obj.name] = obj;
            //this.scriptHash[obj.id] = obj;
            for (var i = 0; i < (this.frameLength || 1) ; i++) {
                this.cachedVisibility[i] = this.cachedVisibility[i] || [];
                this.cachedVisibility[i].push(obj);
            }
            obj.currentScene = this;
            obj.initAndGetDom(this.dom, (behindObj && behindObj.dom) ? behindObj.dom : null);
            Mugeda.nonDisplay ? obj.hide() : (obj.dom.style.cssText += "display:none");
            return obj;
        }

        Scene.prototype.addEventListener = addEventListener;
        Scene.prototype.removeEventListener = removeEventListener;

        // 层对象
        var Layer = function (data, scene) {
            this.id = data.id;
            this.name = data.name;
            this.data = data;
            this.unitList = [];
            this.scene = scene;
        }

        Layer.prototype.initAndGetDom = function (parentdom) {
            var that = this;
            that.data.units.m_operate(function (unitData, unitIndex) {
                var unit = new Unit(unitData, that);
                that.unitList.push(unit);
                unit.initAndGetDom(parentdom);
            }, true);
        }

        // Unit
        var Unit = function (data, layer) {
            this.data = data;
            this.layer = layer;
            this.objectList = [];
            this.symbolList = [];
            this.imageList = [];
            this.id = data.id;
            layer.scene.unitHash[data.id] = this;
            layer.scene.frameParamCache[this.id] = layer.scene.frameParamCache[this.id] || {};
            this.cachedFrame = layer.scene.frameParamCache[this.id];
            this.zoneCached = false;
        }

        Unit.prototype.initAndGetDom = function (parentdom) {
            var that = this;
            if (this.data && (this.data.audio || this.data.audioId)) {
                if (this.data.audioId) {
                    this.audio = loadAudio(thisAni.resDir + thisAni.audioSym[this.data.audioId]);
                }
                else {
                    this.audio = loadAudio(thisAni.resDir + this.data.audio);
                }
            }
            if (this.audio) {
                var hash = Mugeda.guidGen();
                var scene = this.layer.scene;
                for (var i = this.data.frameStart; i < this.data.frameStart + this.data.frameCount; i++) {
                    scene.cachedAudio = scene.cachedAudio || [];
                    scene.cachedAudio[i] = scene.cachedAudio[i] || [];
                    scene.cachedAudio[i].push({ audio: this.audio, start: i == this.data.frameStart, hash: hash });
                }
                thisAni.audioList[hash] = this.audio;
            }
            if (!this.data.objects || this.data.objects.length == 0) return;
            if (this.data.keyframes.length) {
                this.data.hashKey = {};
                this.data.keyframes.m_operate(function (keyframe, keyframeIndex) {
                    that.data.hashKey["key_" + keyframe.id] = keyframe;
                });
            }


            this.data.objects.m_operate(function (objectData, objectIndex) {
                var object = new aObject(objectData, that);
                that.objectList.push(object);
                object.initAndGetDom(parentdom);
                if (object.symbolIdList) {
                    that.symbolList = that.symbolList.concat(object.symbolIdList);
                }
                Mugeda.nonDisplay ? object.hide() : (object.dom.style.cssText += "display:none;");
            });

            if (true) {
                var scene = this.layer.scene;
                for (var i = this.data.frameStart; i < this.data.frameStart + this.data.frameCount; i++) {
                    scene.cachedVisibility[i] = scene.cachedVisibility[i] || [];
                    scene.cachedVisibility[i] = scene.cachedVisibility[i].concat(this.objectList);
                }
                scene.frameLength = Math.max(scene.frameLength, this.data.frameStart + this.data.frameCount);
            }

            if (this.layer.scene.id == '_main') {
                for (var i = this.data.frameStart; i < this.data.frameStart + this.data.frameCount; i++) {
                    thisAni.mainSceneFrameUnitHash[i] = thisAni.mainSceneFrameUnitHash[i] || [];
                    thisAni.mainSceneFrameUnitHash[i].push(this);
                }
            }
        }

        Unit.prototype.updateUnitVisibility = function (visible) {
            this.objectList.m_operate(function (object) {
                if (Mugeda.nonDisplay)
                    visible ? object.show() : object.hide();
                else
                    object.dom.m_css("display", visible ? object.dom["displayType"] || "block" : "none");//, { 'noPrefix': false });
            });
            /*var thisAni = this;

            var objCount = unit.objects.length;

             Not in current range. Hide it. 
            for (var k = 0; k < objCount; k++) {

                objData = unit.objects[k];
                var domList = thisAni.objects[objData.guid];

                if (domList) domList.m_operate(function (dom, domIndex) {
                    dom.m_css("visibility", visible ? "visible" : "hidden", { 'noPrefix': false });
                });
            }*/

        }

        var handleObj = function (parentDom, behindDom) {
            var object = this.data;
            var objDom;
            if (object.param.left === null) { // May also be other invalid values
                if (this.unit && this.unit.data.keyframes && this.unit.data.keyframes.length >= 2)
                    object.param = JSON.parse(JSON.stringify(this.unit.data.keyframes[0].param));
                else {
                    // TODO: Work around this issue!
                    console.log("Fatal error: object (ID: " + object.guid + ") param is lost!");
                }
            }
            var cachedSymbolSceneMode = false
            if (this.currentScene && this.currentScene.cachedSymbolScene) {
                cachedSymbolSceneMode = true;
                var cdom = this.currentScene.dom.getElementsByClassName(this.currentScene.cachedSymbolScene.objectHash[object.guid].dom.className)[0];

            }
            var p = object.param;
            switch (object.type) {
                case 2001:  // Line
                case 2002:  // Pen
                case 2006:  // 多边
                case 2018:  // 路径
                case 2019:  // 曲线
                    break;
                case 2020:  // 音频
                    break;
                case 2003:  // Box
                case 2004:  // Circle
                case 2009:  // 圆角矩形
                    if (cachedSymbolSceneMode) {
                        break;
                    }
                    var lineW = p.lineWidth;
                    var lineWidth = Math.floor(p.lineWidth / 2);
                    objDom = m('<div>');
                    var borderDiv = m('<div>');
                    borderDiv.m_addClass("guid_" + Mugeda.guidGen())
                    if (lineW) {
                        borderDiv.m_css("border", lineW + "px solid " + p.strokeColor)
                        .m_css("position", "absolute")
                        .m_css("top", -lineWidth + "px")
                        .m_css("bottom", -lineWidth + "px")
                        .m_css("left", -lineWidth + "px")
                        .m_css("right", -lineWidth + "px").m_appendTo(objDom);
                    }
                    if (object.type == 2009) {// 圆角矩形
                        var r = object.cornerRadius[0],
                            rs = r + "px ";
                        objDom.m_css("border-radius", rs + rs + rs + rs);

                        // Work around the issue on Galaxy S4. 
                        objDom.m_css("border-top-left-radius", rs);
                        objDom.m_css("border-top-right-radius", rs);
                        objDom.m_css("border-bottom-left-radius", rs);
                        objDom.m_css("border-bottom-right-radius", rs);
                    }
                    else if (object.type == 2004) { // 圆
                        var val1 = (p.width / 2) + "px",
                            val2 = (p.height / 2) + "px"
                        objDom.m_css("border-radius", val1 + ' ' + val2);

                        // Work around the issue on Galaxy S4. 
                        objDom.m_css("border-top-left-radius", val1 + ' ' + val2);
                        objDom.m_css("border-top-right-radius", val1 + ' ' + val2);
                        objDom.m_css("border-bottom-left-radius", val1 + ' ' + val2);
                        objDom.m_css("border-bottom-right-radius", val1 + ' ' + val2);
                    }
                    objDom.m_css("background", m.getCssBackgroundColor(p));
                    if (lineW) {
                        if (object.type == 2009) {// 圆角矩形
                            var rs = object.cornerRadius[0] + lineWidth + "px ";
                            borderDiv.m_css("border-radius", rs + rs + rs + rs);
                            // Work around the issue on Galaxy S4. 
                            borderDiv.m_css("border-top-left-radius", rs);
                            borderDiv.m_css("border-top-right-radius", rs);
                            borderDiv.m_css("border-bottom-left-radius", rs);
                            borderDiv.m_css("border-bottom-right-radius", rs);
                            // borderDiv.m_css("webkit-border-radius", rs + rs + rs + rs);
                        }
                        else if (object.type == 2004) { // 圆
                            var val1 = (p.width / 2 + lineWidth) + "px";
                            var val2 = (p.height / 2 + lineWidth) + "px";
                            borderDiv.m_css("border-radius", val1 + ' ' + val2);

                            // Work around the issue on Galaxy S4. 
                            borderDiv.m_css("border-top-left-radius", val1 + ' ' + val2);
                            borderDiv.m_css("border-top-right-radius", val1 + ' ' + val2);
                            borderDiv.m_css("border-bottom-left-radius", val1 + ' ' + val2);
                            borderDiv.m_css("border-bottom-right-radius", val1 + ' ' + val2);
                        }
                    }
                    break;
                case 2005: // Image

                    // TODO: Bug fixing: whey p.imageSrc is empty???
                    if (!p.imageSrc.length)
                        p.imageSrc = "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

                    if (p.imageSrc.length > 0) {
                        this.userParam = this.userParam || [];
                        this.userParam.src = thisAni.resDir + p.imageSrc;

                        if (cachedSymbolSceneMode) {
                            // 处理翻转的情况
                            var imgDom = cdom
                            if (cdom.tagName == "DIV") imgDom = cdom.childNodes[0];
                            thisAni.loadImage('dom_back', { dom: imgDom, url: thisAni.resDir + p.imageSrc, duringBuilding: thisAni.zoneCachedMode, scene: this.currentScene, unit: this.unit });
                            break;
                        }
                        /*
                        objDom = m('<div>')//.m_css("background-image", "url(" + thisAni.resDir + p.imageSrc + ")")
                            .m_css("background-position", "center")
                            .m_css("background-repeat", "no-repeat")
                            .m_css("background-size", p.keepAspect ? "contain" : (p.width + "px " + p.height + "px"))
                            .m_css("background-color", "rgba(0,0,0,0)")
                            */
                        objDom = m('<img>')
                        if (p.keepAspect) {
                            var rw = p.rawWidth,
                                rh = p.rawHeight,
                                w = p.width,
                                h = p.height,
                                th = w / rw * rh,
                                tw = w,
                                dw = 0,
                                dh = 0;
                            if (th > h) {
                                tw = h / rh * rw;
                                th = h;
                                dw = (w - tw) / 2;
                                objDom.m_css("padding-left", dw.toString() + 'px');
                                objDom.m_css("padding-right", dw.toString() + 'px');
                            }
                            else {
                                dh = (h - th) / 2;
                                objDom.m_css("padding-top", dw.toString() + 'px');
                                objDom.m_css("padding-bottom", dw.toString() + 'px');
                            }

                        }
                        thisAni.loadImage('dom_back', { dom: objDom, url: thisAni.resDir + p.imageSrc, duringBuilding: thisAni.zoneCachedMode, scene: this.currentScene, unit: this.unit });

                    }
                    break;
                case 2010: // Text
                    {
                        if (cachedSymbolSceneMode) {
                            cdom["displayType"] = "table";
                            break;
                        }
                        objDom = m('<div>');
                        var txtDom = m('<div>').m_appendTo(objDom)
                            .m_css("display", "table-cell")
                            .m_css("vertical-align", p.textVAlign || "baseline");

                        txtDom["displayType"] = "table-cell";

                        txtDom.innerHTML = unescape(p.textContent).replace(/\n/g, "<br>").replace(/\s\s/g, " &nbsp;");
                        txtDom.txt = p.textContent;
                        objDom.m_css("font-size", p.fontSize + "px")
                            .m_css("font-weight", p.fontWeight)
                            .m_css("font-family", p.fontFamily)
                            .m_css("display", "table")
                            .m_css("text-stroke", (p.lineWidth / 2) + "px " + p.strokeColor)
                            .m_css("text-shadow", "0 " + (p.lineWidth / 2 < 1 ? 1 : p.lineWidth / 2) + "px " + p.strokeColor)
                            .m_css("line-height", (parseInt(p.fontSize) + 4) + "px")
                            .m_css("text-align", p.textAlign || "left")
                            .m_css("text-fill-color", m.getCssBackgroundColor(p))
                            .m_css("color", "rgba(" + p.fillInfo.fillColors[0].r + "," + p.fillInfo.fillColors[0].g + "," + p.fillInfo.fillColors[0].b + "," + p.fillInfo.fillColors[0].a + ")")
                            .m_css("padding-top", "1px");

                        objDom["displayType"] = "table";

                        if (p.fontStyle)
                            objDom.m_css("font-style", p.fontStyle);
                        if (p.textDecoration)
                            objDom.m_css("text-decoration", p.textDecoration);
                    }
                    break;
                case 2014: // Group
                    if (cachedSymbolSceneMode) {
                        objDom = this.currentScene.dom.getElementsByClassName(this.currentScene.cachedSymbolScene.objectHash[object.guid].dom.className)[0];
                    }
                    else {
                        objDom = m('<div>');
                        objDom.m_addClass("group");
                    }
                    //handleObject(object.items, objDom, unit, layer);
                    var group = new Group(this, objDom, this.unit, this.currentScene);
                    this.group = group;
                    group.initAndGetDom(objDom);

                    break;
                case 2023: //backgrond-animation
                    var genParam = function (frame) {
                        return {
                            "fillInfo": null,
                            "imageSrc": p.imageSrc,
                            "rawWidth": p.rawWidth,
                            "rawHeight": p.rawHeight * p.frameNum,
                            "left": 0,
                            "right": p.rawWidth,
                            "top": -p.rawHeight * frame,
                            "bottom": p.rawHeight * (p.frameNum - frame),
                            "scaleX": 1,
                            "scaleY": 1,
                            "rotate": 0,
                            "alpha": 1,
                            "width": p.rawWidth,
                            "height": p.rawHeight * p.frameNum
                        }
                    }
                    var fakeSymbolId = Mugeda.guidGen();
                    var frameCount = Math.ceil(p.frameNum / p.fps * thisAni.rate)
                    thisAni.symbols[fakeSymbolId] = {
                        "id": fakeSymbolId,
                        "name": fakeSymbolId,
                        "cw": thisAni.aniData.width,
                        "ch": thisAni.aniData.height,
                        "layers": [{
                            "id": 0,
                            "name": "图层0",
                            "units": [{
                                "id": Mugeda.guidGen(),
                                "layerId": 0,
                                "frameStart": 0,
                                "frameCount": frameCount,
                                "animated": true,
                                "objects": [{
                                    "guid": Mugeda.guidGen(),
                                    "type": 2005,
                                    "param": genParam(0)
                                }],
                                "keyframes": [],
                                "hashKey": [],
                                "visible": true
                            }]
                        }]
                    }

                    var lastImageId = null;
                    for (var fid = 0; fid < frameCount; fid++) {
                        var imageId = Math.min(Math.round(fid / thisAni.rate * p.fps), p.frameNum - 1)
                        if (imageId != lastImageId) {
                            thisAni.symbols[fakeSymbolId].layers[0].units[0].keyframes.push({
                                "id": fid, "mode": 0, "tween": "Step.EaseIn", "param": genParam(imageId)
                            });
                            lastImageId = imageId;
                        }
                        thisAni.symbols[fakeSymbolId].layers[0].units[0].guessKeyframe = false
                    }
                    p.symbolId = fakeSymbolId;
                    p.offsetX = -thisAni.aniData.width / 2;
                    p.offsetY = -thisAni.aniData.height / 2;
                    
                case 2021: // Symbol
                    if (!thisAni.symbols[p.symbolId]) break;
                    var symbol = thisAni.symbols[p.symbolId];

                    if (cachedSymbolSceneMode) {
                        var offsetX = thisAni.symbols[p.symbolId].cw / 2 + p.offsetX,
                        offsetY = thisAni.symbols[p.symbolId].ch / 2 + p.offsetY;
                        var symbolImplement = this.scene = new Scene(this.data.guid, thisAni.symbols[p.symbolId], true, 0, { x: offsetX, y: offsetY }, cdom, true, this.currentScene, this);
                        symbolImplement.cachedSymbolScene = this.currentScene.cachedSymbolScene.objectHash[object.guid].scene
                        symbolImplement.initAndGetDom();
                    }
                    else {
                        objDom = m('<div>');
                        objDom.m_addClass("symbol");

                        if (object.type == 2023) {
                            objDom.m_css('overflow', 'hidden');
                        }
                        var offsetX = thisAni.symbols[p.symbolId].cw / 2 + p.offsetX,
                        offsetY = thisAni.symbols[p.symbolId].ch / 2 + p.offsetY;

                        var symbolImplement = this.scene = new Scene(this.data.guid, thisAni.symbols[p.symbolId], true, 0, { x: offsetX, y: offsetY }, objDom, true, this.currentScene, this);

                        if (object.type == 2023) {
                            if (p.looped == null) p.looped = true;
                            this.scene.looped = p.looped;
                        }
                        // 检查是否有元件缓存
                        if (!symbol.cachedInstance) {
                            symbolImplement.initAndGetDom();
                        }
                        else {
                            symCache = symbol.cachedInstance.scene;
                            // step1: 复制dom
                            symbolImplement.dom.innerHTML = symCache.dom.innerHTML;
                            // 进入cacheSymbolMode
                            symbolImplement.cachedSymbolScene = symCache;
                            symbolImplement.initAndGetDom();
                        }
                    }
                    break;
            }
            if (objDom || cachedSymbolSceneMode) {
                if (cachedSymbolSceneMode) {
                    this.dom = cdom;
                    this.currentScene.objectHash[object.guid] = this;
                    this.updateObjectParam({ staticMode: true, readyCachedMode: true, isImage: (object.type == 2005) });
                }
                else {
                    objDom.m_addClass("layer_" + (this.unit ? this.unit.layer.id : "script"))
                    //.m_addClass("unit_" + this.unit.id)
                    .m_addClass("guid_" + this.id)
                    .m_css("position", "absolute")
                    .m_css("left", 0)
                    .m_css("top", 0)
                    // .m_css("transition-duration", Math.floor(100*thisAni.frameTime)*0.01 + "ms")
                    // .m_css("transform-timing-function", "linear")
                    //.m_css("transform-style", "preserve-3d")
                    .m_css("backface-visibility", "hidden");

                    if (p.vF || p.hF) {
                        var flipDiv = m('<div>').m_css("position", "absolute").m_append(objDom);
                        objDom.m_css("top", "0").m_css("left", "0").m_css("right", "0").m_css("bottom", "0")							
                            .m_css("transform", (p.vF ? "scaleY(-1) " : "") + (p.hF ? "scaleX(-1)" : ""))
                        objDom = flipDiv;
                        flipDiv.className = "guid_" + Mugeda.guidGen();

                    }
                    parentDom.m_append(objDom, behindDom);
                    this.dom = objDom;
                    this.currentScene.objectHash[object.guid] = this;
                    this.updateObjectParam({ staticMode: true, isImage: (object.type == 2005), dw: dw, dh: dh });
                }
            }
        }

        // aItem
        var Group = function (parentObject, dom, unit, scene) {
            this.parent = parentObject;
            this.dom = dom;
            this.data = parentObject.data.items;
            this.objectList = [];
            this.unit = unit;
            this.scene = scene;
        }

        Group.prototype.initAndGetDom = function () {
            var that = this;
            if (this.data.length == 0) return;

            this.data.m_operate(function (objectData, objectIndex) {
                var object = new aObject(objectData, that.unit, { inGroup: true, group: that });
                if (!object.currentScene) object.currentScene = that.scene;
                that.objectList.push(object);
                object.initAndGetDom(that.dom);
            });
        }

        // aObject
        var aObject = MugedaCss3.aObject = function (data, unit, param) {
            this.data = JSON.parse(JSON.stringify(data));;
            this.unit = unit;
            this.currentScene = unit ? unit.layer.scene : null;
            //this.id = data.guid;
            this.id = Mugeda.guidGen();
            if (unit) {
                this.currentScene.nameHash[data.param.name] = this;
            }
            if (param) {
                if (param.inGroup) {
                    this.offset = { x: 0, y: 0 };
                    this.parentGroup = param.group;
                }

            }
            this.event = {};
            this.thisAni = thisAni;
            this.userParam = {};

            var symbolList = [],
                symbolIdList = []

            var searchSymbol = function (objData) {
                if (objData.items) {
                    for (var i = 0; i < objData.items.length; i++) {
                        var item = objData.items[i];
                        if (item.type == 2021 || item.type == 2023) {
                            symbolList.push(item.guid);
                            symbolIdList.push(item.param.symbolId);
                        }
                        else if (objData.type == 2014) {
                            searchSymbol(item);
                        }
                    }
                }
            }
            if (data.type == 2014) {
                searchSymbol(data)
            }
            else if (data.type == 2021 || data.type == 2023) {
                symbolList.push(data.guid);
                symbolIdList.push(data.param.symbolId);
            }
            if (symbolList.length) {
                this.symbolList = symbolList;
                this.symbolIdList = symbolIdList;
            }
            Object.defineProperty(this, "name", {
                get: function () { return this.data.param.name },
                set: function (value) {
                    if (this.currentScene.nameHash[value]) {
                        throw "name had been used before";
                        return;
                    }
                    this.currentScene.nameHash[value] = this.currentScene.nameHash[this.data.param.name];
                    delete this.currentScene.nameHash[this.data.param.name];
                    this.data.param.name = value;
                }
            });

            if (data.type == 2005) {
                Object.defineProperty(this, 'src', {
                    get: function () { return this.userParam.src },
                    set: function (value) {
                        this.userParam.src = value;
                        //this.dom.m_css("background-image", "url(" + value + ")");
                        if (this.dom.tagName == "DIV") {
                            this.dom.childNodes[0].src = value;
                        }
                        else {
                            this.dom.src = value;
                        }
                    }
                });
            }

            Object.defineProperty(this, "width", {
                get: function () { return this.data.param.width },
                set: function (value) {
                    var w1 = this.data.param.width / this.scaleX,
                        rx1 = this.rotateCenterX / this.scaleX;
                    this.rotateCenterX = 0;
                    this.scaleX = value / w1;
                    this.rotateCenterX = rx1 * this.scaleX;
                }
            });


            Object.defineProperty(this, "height", {
                get: function () { return this.data.param.height },
                set: function (value) {
                    var h1 = this.data.param.height / this.scaleY,
                        ry1 = this.rotateCenterY / this.scaleY;
                    this.rotateCenterY = 0;
                    this.scaleY = value / h1;
                    this.rotateCenterY = ry1 * this.scaleY;
                }
            });

            Object.defineProperty(this, "left", {
                get: function () { return this.data.param.left },
                set: function (value) {
                    this.userParam.x = value - this.userParam.ox + this.userParam.rx;
                    this.data.param.left = value;
                    this.data.param.right = this.data.param.left + this.data.param.width;
                    updateObjectParamCollect(this);
                }
            });
            Object.defineProperty(this, "right", {
                get: function () { return this.data.param.right },
                set: function (value) {
                    this.data.param.right = value;
                    this.data.param.left = value - this.data.param.width;
                    this.userParam.x = this.data.param.left - this.userParam.ox + this.userParam.rx;


                    updateObjectParamCollect(this);
                }
            });
            Object.defineProperty(this, "top", {
                get: function () { return this.data.param.top },
                set: function (value) {

                    this.data.param.top = value;
                    this.userParam.y = value - this.userParam.oy + this.userParam.ry;
                    this.data.param.bottom = this.data.param.top + this.data.param.height;
                    updateObjectParamCollect(this);
                }
            });
            Object.defineProperty(this, "bottom", {
                get: function () { return this.data.param.bottom },
                set: function (value) {
                    this.data.param.bottom = value;
                    this.data.param.top = value - this.data.param.height;
                    this.userParam.y = this.data.param.top - this.userParam.oy + this.userParam.ry;
                    updateObjectParamCollect(this);
                }
            });

            Object.defineProperty(this, "x", {
                get: function () { return this.userParam.x },
                set: function (value) {
                    this.userParam.x = value;
                    this.data.param.left = value + this.userParam.ox - this.userParam.rx;
                    this.data.param.right = this.data.param.left + this.data.param.width;
                    updateObjectParamCollect(this);
                }
            });

            Object.defineProperty(this, "y", {
                get: function () { return this.userParam.y },
                set: function (value) {
                    this.userParam.y = value;
                    this.data.param.top = value + this.userParam.oy - this.userParam.ry;
                    this.data.param.bottom = this.data.param.top + this.data.param.height;
                    updateObjectParamCollect(this);
                }
            });

            Object.defineProperty(this, "rotateCenterX", {
                get: function () { return this.userParam.rx },
                set: function (value) {
                    this.data.param.rotateCenterX = this.userParam.rx = Math.round(value);
                    this.userParam.rsx = value / this.userParam.sx;
                    this.userParam.x = this.data.param.left + value - this.userParam.ox;
                    updateObjectParamCollect(this);
                }
            });

            Object.defineProperty(this, "rotateCenterY", {
                get: function () { return this.userParam.ry },
                set: function (value) {
                    this.data.param.rotateCenterY = this.userParam.ry = Math.round(value);
                    this.userParam.rsy = value / this.userParam.sy;
                    this.userParam.y = this.data.param.top + value - this.userParam.oy;
                    updateObjectParamCollect(this);
                }
            });

            Object.defineProperty(this, "scaleX", {
                get: function () { return this.userParam.sx },
                set: function (value) {
                    this.userParam.rx = this.userParam.rx / this.userParam.sx * value;
                    this.userParam.sx = this.data.param.scaleX = value;
                    this.data.param.width = this.data.param.rawWidth * value;
                    this.data.param.left = this.userParam.x + this.userParam.ox - this.userParam.rx
                    this.data.param.right = this.data.param.left + this.data.param.width;
                    updateObjectParamCollect(this);
                }
            });

            Object.defineProperty(this, "scaleY", {
                get: function () { return this.userParam.sy },
                set: function (value) {
                    this.userParam.ry = this.userParam.ry / this.userParam.sy * value;
                    this.userParam.sy = this.data.param.scaleY = value;
                    this.data.param.height = this.data.param.rawHeight * value;
                    this.data.param.top = this.userParam.y + this.userParam.oy - this.userParam.ry;
                    this.data.param.bottom = this.data.param.top + this.data.param.height;
                    updateObjectParamCollect(this);
                }
            });

            Object.defineProperty(this, "rotate", {
                get: function () { return this.data.param.rotate },
                set: function (value) {
                    this.data.param.rotate = value;
                    updateObjectParamCollect(this);
                }
            });

            Object.defineProperty(this, "alpha", {
                get: function () { return this.data.param.alpha },
                set: function (value) {
                    this.data.param.alpha = value;
                    updateObjectParamCollect(this);
                }
            });

            this.userParam.visible = true;
            Object.defineProperty(this, "visible", {
                get: function () { return this.userParam.visible },
                set: function (value) {
                    this.userParam.visible = value;
                    //if (value) this.dom.m_css("display", object.dom.m_attr("displayType") || "block")
                    //else this.dom.m_css("display", "none");
                }
            });

            Object.defineProperty(this, "text", {
                get: function () { if (this.data.type == 2010) return unescape(this.data.param.textContent) },
                set: function (value) {
                    if (this.data.type == 2010) this.data.param.textContent = escape(value);
                    updateObjectParamCollect(this);
                }
            });
        }

        var updateObjectParamList = {};
        var updateObjectParamTogether = function () {
            delete updateObjectParamList.old;
            for (objId in updateObjectParamList) {
                updateObjectParamList[objId].updateObjectParam();
            }
            updateObjectParamList = {};
        }
        var updateObjectParamCollect = function (obj) {
            updateObjectParamList[obj.id] = obj;
            updateObjectParamList.old = true;
            setTimeout(updateObjectParamTogether, 0)
        }



        aObject.prototype.setCapture = function (capture) { this.dom.m_setCapture(capture); };
        aObject.prototype.releaseCapture = function (capture) { this.dom.m_releasecapture(capture) };
        aObject.prototype.initAndGetDom = handleObj;
        aObject.prototype.addEventListener = addEventListener;
        aObject.prototype.removeEventListener = removeEventListener;

        aObject.prototype.setParam = function (callback) {
            callback.call(this, this.param);
            this.updateObjectParam({ param: this.param });
            if (Mugeda.nonDisplay)
                this.param.hide ? this.hide() : this.show();
            else
                this.dom.m_css("display", this.param.hide ? "none" : (this.dom["displayType"] || "block"));
        }

        aObject.prototype.getParam = function () {
            this.param.hide = this.param.hide || false;
            return this.param;
        }

        aObject.prototype.setButton = function (normal, push, up) {
            var sc = this.scene;
            if (sc) {
                if (up == undefined) up = normal;
                if (typeof (normal) == "number") normal = { from: normal, to: normal, isLoop: false };
                if (typeof (push) == "number") push = { from: push, to: push, isLoop: false };
                if (typeof (up) == "number") up = { from: up, to: up, isLoop: false };
                sc.setSegment("__normal", normal.from, normal.to, normal.isLoop);
                sc.setSegment("__push", push.from, push.to, push.isLoop);
                sc.setSegment("__up", up.from, up.to, up.isLoop);
                sc.playSegment("__normal");
                this.addEventListener("inputstart", function (event) { if (!this.disabled) this.scene.playSegment("__push") });
                this.addEventListener("inputend", function (event) { if (this.scene.currentSegment == sc.segment["__push"]) this.scene.playSegment("__up") });
                this.addEventListener("mouseout", function (event) { if (this.scene.currentSegment == sc.segment["__push"]) this.scene.playSegment("__up") });
            }
            this.dom.m_css("cursor", "pointer");
            return this;
        }

        aObject.prototype.appendChild = function (obj, behindObj) {
            if (obj.name && this.currentScene.nameHash[obj.name]) {
                throw "object name: " + obj.name + " had been used";
                return;
            }
            this.currentScene.nameHash[obj.name] = obj;
            //this.scriptHash[obj.id] = obj;
            var frameStart = this.unit ? 0 : this.unit.data.frameStart,
                frameEnd = this.unit ? this.currentScene.frameLength : frameStart + this.unit.data.frameCount;
            for (var i = frameStart; i < frameEnd; i++) {
                this.currentScene.cachedVisibility[i] = this.currentScene.cachedVisibility[i] || [];
                this.currentScene.cachedVisibility[i].push(obj);
            }
            obj.currentScene = this.currentScene;
            obj.initAndGetDom(this.dom, (behindObj && behindObj.dom) ? behindObj.dom : null);
            Mugeda.nonDisplay ? obj.hide() : (obj.dom.style.cssText += "display:none");
            return obj;
        }

        aObject.prototype.updateObjectParam = function (param) {
            param = (param || {});
            staticMode = param.staticMode || false;
            readyCachedMode = param.readyCachedMode || false
            var dom = this.dom,
                offset = this.offset || this.currentScene.offset,
                p = param.param || this.data.param,
                _ = this;
            this.param = p;
            //callEvent.call(this, "beforeupdate");
            //if(dom.className.indexOf("qhq95qqxs") >-1) debugger
            if (staticMode) {
                if (param.isImage) {
                    p.rawWidth = p.width - (param.dw ? param.dw * 2 : 0);
                    p.rawHeight = p.height - (param.dh ? param.dh * 2 : 0);
                }
                else {
                    p.rawWidth = p.rawWidth || p.width;
                    p.rawHeight = p.rawHeight || p.height;
                }
                if (!readyCachedMode) {
                    var needBorder = ((this.data.curve && this.data.curve.points.length) || (p.textContent && p.textContent.length));
                    var lineWidth = needBorder ? (p.lineWidth || 1) : 0;
                    dom.m_width(p.rawWidth).m_height(p.rawHeight);
                    if (p.vF || p.hF) {
                        dom.childNodes[0].m_width(p.rawWidth).m_height(p.rawHeight);
                    }
                }

                if (p.action) {
                    if (p.action == "link" && p.url && p.url.length) {
                        var fun = function () { MugedaMraid.openLink(p.url, p.urlTarget) };
                        dom.m_css("cursor", "pointer").m_event(
							(Mugeda.isAndroid && Mugeda.androidVersion < 3) ? "click" : (useTouch ? "touchend" : "mouseup"),
							function (event) { fun(); event.preventDefault(); event.stopPropagation(); return false; }
						);
                    }
                    else if (p.action == "form" && p.form && p.form.length) {
                        var fun = function () { MugedaBehavior.popupForm(JSON.parse(p.form)); }
                        dom.m_css("cursor", "pointer").m_event(useTouch ? "touchend" : "mouseup", function (event) { fun(); event.preventDefault(); event.stopPropagation(); return false; });
                    }
                    else if (p.action == "behavior" && p.behavior) {
                        var beList = JSON.parse(p.behavior);
                        p.behaviorObj = beList;
                        beList.m_operate(function (be, index) {
                            if (be.type == "audio") {
                                var audioUrl = be.param.audio_id ? thisAni.audioSym[be.param.audio_id] : be.param["audio_url"];
                                //var audioHash = be.hash;
                                thisAni.audioBeList = thisAni.audioBeList || {};
                                var audioId = Mugeda.guidGen();
                                be.param['audioId'] = audioId;
                                thisAni.audioBeList[audioId] = loadAudio(thisAni.resDir + audioUrl);
                                if (be.param["audio_name"]) _.currentScene.nameHash[be.param["audio_name"]] = thisAni.audioBeList[audioId];
                                thisAni.audioList[audioId] = thisAni.audioBeList[audioUrl];
                            }
                        });
                    }
                }
            }
            else {
                //dom.m_css("transition-timing-function", param.showAnimation ? "linear" : "step-start");
                // dom.m_css("transition-duration", param.showAnimation && isAndroid ? thisAni.frameTimeString : "0");
                //dom.m_css("transition-property", param.showAnimation && !isAndroid ? "all" : "none");
                // dom.m_css("transition", "all ease-out 200ms");


            }
            var scaleX = p.width / p.rawWidth,
                scaleY = p.height / p.rawHeight;
            //scaleX = (Math.abs(scaleX) < 0.01 ? 0 : Math.floor(100 * scaleX) * 0.01);
            //scaleY = (Math.abs(scaleY) < 0.01 ? 0 : Math.floor(100 * scaleY) * 0.01);

            var rotateCenterX = p.rotateCenterX != undefined ? p.rotateCenterX : p.width / 2,
                rotateCenterY = p.rotateCenterY != undefined ? p.rotateCenterY : p.height / 2,
                rotateX = Math.round(rotateCenterX / scaleX),
                rotateY = Math.round(rotateCenterY / scaleY);

            rotateCenterX = rotateX * scaleX;
            rotateCenterY = rotateY * scaleY;

            var translateX = p.left - (rotateX - rotateCenterX) - offset.x,
                translateY = p.top - (rotateY - rotateCenterY) - offset.y,
                rotate = p.rotate;

            // 防止出现指数
            if (translateX.toString().indexOf('e') > -1) translateX = 0;
            if (translateY.toString().indexOf('e') > -1) translateY = 0;
            if (scaleX.toString().indexOf('e') > -1) scaleX = 0;
            if (scaleY.toString().indexOf('e') > -1) scaleY = 0;
            if (rotate.toString().indexOf('e') > -1) rotate = 0;

            //translateX = (Math.abs(translateX) < 0.01 ? 0 : Math.floor(100 * translateX) * 0.01);
            //translateY = (Math.abs(translateY) < 0.01 ? 0 : Math.floor(100 * translateY) * 0.01);

            this.userParam.x = translateX + rotateX;
            this.userParam.y = translateY + rotateY;
            this.userParam.rx = rotateCenterX;
            this.userParam.ry = rotateCenterY;
            this.userParam.sx = scaleX;
            this.userParam.sy = scaleY;
            this.userParam.rsx = rotateX;
            this.userParam.rsy = rotateY;
            this.userParam.ox = offset.x;
            this.userParam.oy = offset.y;


            //if (this.data.guid == "2y6dlck02k") debugger;

            //dom.m_transform(translateX, translateY, p.rotate, scaleX, scaleY, rotateX, rotateY)

            dom.m_css("opacity", Math.floor(100 * p.alpha) * 0.01, thisAni)
                 .m_css("transform-origin", rotateX.toString() + "px " + rotateY.toString() + "px", thisAni);

            /*
            if (Mugeda.threeDRendering) {
				// translate3d causes image blurring. Why?
                this.beforeHiddenTrans = "translate3d(" + translateX.toString() + "px," + translateY.toString() + "px, 0) rotate(" + (Math.abs(p.rotate) < 0.01 ? 0 : Math.floor(100 * p.rotate) * 0.01) + "rad) scale(" + scaleX.toString() + "," + scaleY.toString() + ")";
            }
            else {
                this.beforeHiddenTrans = "translate(" + translateX.toString() + "px," + translateY.toString() + "px) rotate(" + (Math.abs(p.rotate) < 0.01 ? 0 : Math.floor(100 * p.rotate) * 0.01) + "rad) scale(" + scaleX.toString() + "," + scaleY.toString() + ")";
            }
			*/
            this.beforeHiddenTrans = "translate(" + translateX.toString() + "px," + translateY.toString() + "px) rotate(" + rotate.toString() + "rad) scale(" + scaleX.toString() + "," + scaleY.toString() + ")";

            if (!this.hidden)
                dom.m_css("transform", this.beforeHiddenTrans, thisAni);
            if (p.textContent != undefined && dom.childNodes[0].txt != p.textContent) {
                dom.childNodes[0].innerHTML = unescape(p.textContent).replace(/\n/g, "<br>");
                //dom.childNodes[0].textContent = unescape(p.textContent);
                dom.childNodes[0].txt = p.textContent;
            }
        }

        aObject.prototype.hide = function () {
            if (this.hidden) return;
            this.dom.m_css("transform", "translate(-9999999px, -99999999px)", thisAni);
            this.hidden = true;
            return this;
        }

        aObject.prototype.show = function () {
            if (!this.hidden) return;
            if (this.beforeHiddenTrans) this.dom.m_css("transform", this.beforeHiddenTrans, thisAni);
            this.hidden = false;
            return this;
        }

        aObject.prototype.clone = function (name) {
            var data = JSON.parse(JSON.stringify(this.data));
            data.param.name = name;
            data.guid = Mugeda.guidGen();
            var obj = new aObject(data, null);
            return obj;
        }

        // 试着载入script
        if (thisAni.scriptFile) {
            /*thisAni.countDownRef = 1;
            Mugeda.loadJs(thisAni.resDir + thisAni.scriptFile, function () {
                //console.log("has script");
                thisAni.script = Mugeda.script[Mugeda.script.length - 1];
                thisAni.script(thisAni);

                thisAni.checkCountDownRef();

            }, function () {
                thisAni.checkCountDownRef();
            })
            */
            thisAni.loadImage('script', thisAni.resDir + thisAni.scriptFile);

        }
        else if (thisAni.aniData.script) {
            // 否则检查anidata.script
            //var scText = "function (mugeda) {\n" + thisAni.aniData.script + "\n}";
            var fun = function (mugeda) {
                eval(mugeda.aniData.script);
            }
            // fun(thisAni);

            Mugeda.customScript = thisAni.aniData.script;

            //eval("scFun =" + scText + "(thisAni)");
        }
        // 载入外部脚本
        if (thisAni.aniData.sL) {
            if (!Mugeda.previewMode) {
                if (thisAni.aniData.sL.jquery) {
                    thisAni.loadImage('script', thisAni.resDir + 'jquery-1.10.2.min.js');
                }
                if (thisAni.aniData.sL.socketio) {
                    thisAni.loadImage('script', thisAni.resDir + 'socket.io.1.9.16.min.js');
                    thisAni.loadImage('script', thisAni.resDir + 'mugeda_connection.js');
                }
                if (thisAni.aniData.sL.box2d) {
                    thisAni.loadImage('script', thisAni.resDir + 'Box2dWeb-2.1.a.3.min.js');
                }
                if (thisAni.aniData.sL.qrcode) {
                    thisAni.loadImage('script', thisAni.resDir + 'qrcode.min.js');
                    thisAni.loadImage('script', thisAni.resDir + 'jquery.qrcode.min.js', 1);
                }
            }
            else {
                if (thisAni.aniData.sL.extra && thisAni.aniData.sL.extra.length) {
                    for (var si = 0; si < thisAni.aniData.sL.extra.length; si++) {
                        thisAni.loadImage('script', thisAni.aniData.sL.extra[si]);
                    }
                }
            }
        }
        if (thisAni.aniData.sL && !Mugeda.previewMode) {
            if (thisAni.aniData.sL.jquery) {
                thisAni.loadImage('script', thisAni.resDir + 'jquery-1.10.2.min.js');
            }
            if (thisAni.aniData.sL.socketio) {
                thisAni.loadImage('script', thisAni.resDir + 'socket.io.1.9.16.min.js');
                thisAni.loadImage('script', thisAni.resDir + 'mugeda_connection.js');
            }
            if (thisAni.aniData.sL.box2d) {
                thisAni.loadImage('script', thisAni.resDir + 'Box2dWeb-2.1.a.3.min.js');
            }
            if (thisAni.aniData.sL.qrcode) {
                thisAni.loadImage('script', thisAni.resDir + 'qrcode.min.js');
                thisAni.loadImage('script', thisAni.resDir + 'jquery.qrcode.min.js', 1);
            }
            if (thisAni.aniData.sL.extra && thisAni.aniData.sL.extra.length) {
                for (var si = 0; si < thisAni.aniData.sL.extra.length; si++) {
                    thisAni.loadImage('script', thisAni.aniData.sL.extra[si]);
                }
            }
        }
        // 创建非内链的style块
        var style = document.createElement("style");
        document.getElementsByTagName("head")[0].appendChild(style);
        thisAni.externalStylesheet = style.sheet || style.styleSheet;
        thisAni.indexedStylesheet = {};
        thisAni.cachedRule = [];
        // 建立舞台

        // Assign body background color as the data.color
        // This is moved to loader.js, staying together with other body styles (e.g., margin)s
        // document.body.m_css("background", data.color);

        this.dom.m_attr('name', data.title).m_addClass("MugedaStage").m_width(data.width)
            .m_height(data.height).m_css("background-color", data.color)
            .m_css("background-image", data.image ? "url(" + data.image + ")" : "")
            .m_css("background-repeat", "no-repeat")
            .m_css("background-size", data.width + "px " + data.height + "px")
            .m_css("overflow", "hidden").m_css("position", "relative");
        if (Mugeda.enablePulse) this.dom.m_css("transform", "translate(0,0)");
        this.dom.style.webkitTapHighlightColor = "rgba(0,0,0,0)";

        // 对舞台上含有连接的动画增加链接
        if (data.action == "link" && data.url && data.url.length) {
            var fun = function () { MugedaMraid.openLink(data.url, data.urlTarget) };
            this.dom.m_css("cursor", "pointer").m_event(
				(Mugeda.isAndroid && Mugeda.androidVersion < 3) ? "click" : (useTouch ? "touchend" : "mouseup"),
				function (event) { fun(); event.preventDefault(); event.stopPropagation(); return false; }
				);
        }

        if (data.action == "form" && data.form && data.form.length) {
            var fun = function () { MugedaBehavior.popupForm(JSON.parse(data.form)); }
            this.dom.m_css("cursor", "pointer").m_event(useTouch ? "touchend" : "mouseup", function (event) { 
				fun(); 
				event.preventDefault(); event.stopPropagation(); return false; });
        }

        var collectImages = function (symbolObj) {
            var images = images || [];
            var layersSym = symbolObj.layers;
            if (layersSym) {
                layersSym.m_operate(function () {
                    var unitsSym = this.units;
                    if (unitsSym) {
                        unitsSym.m_operate(function () {
                            var objectsSym = this.objects;
                            if (objectsSym) {
                                var objectFun = function () {
                                    var type = this.type;
                                    if (type == 2005) {
                                        images.push(thisAni.resDir + this.param.imageSrc);
                                    }
                                    else if (type == 2021) {
                                        images = images.concat(collectImages(thisAni.symbols[this.param.symbolId]));
                                    }
                                    else if (type == 2014) {
                                        var items = this.items;
                                        items.m_operate(function () {
                                            objectFun.call(this);
                                        });
                                    }
                                }
                                objectsSym.m_operate(function () { objectFun.call(this) });
                            }
                        });
                    }
                });
            }
            return images;
        }
        // 建立symbol hash
        thisAni.symbols = {};
        thisAni.audioSym = {};
        thisAni.symbolsName = {};
        thisAni.aniData.symbols.m_operate(function (symbolObj, index) {
            if (symbolObj.type === 2) {
                thisAni.audioSym[symbolObj.id] = symbolObj.url;
                return;
            }
            thisAni.symbols[symbolObj.id] = symbolObj;
            thisAni.symbolsName[symbolObj.name] = symbolObj;
            // 计算元件的边界
            var left = 99999999, right = -left, top = left, bottom = -left;
            symbolObj.layers.m_operate(function (layer, i) {
                layer.units.m_operate(function (unit, i) {
                    unit.objects.m_operate(function (object, i) {
                        var p = object.param;
                        left = Math.min(left, p.left);
                        right = Math.max(right, p.right);
                        top = Math.min(top, p.top);
                        bottom = Math.max(bottom, p.bottom);
                    });
                });
            });
            symbolObj.bound = { left: left, right: right, top: top, bottom: bottom, width: right - left, height: bottom - top };
            symbolObj.zoneCached = false;
            symbolObj.imageList = symbolObj.imageList || collectImages(symbolObj);
            // 生成元件实例的anidata，此时offset，guid，name是错误的
            var symbol = symbolObj,
                instanceName = ''
            var anidata = { "guid": Mugeda.guidGen(), "type": 2021, "param": { "name": instanceName, "fillInfo": { "fillStyle": 0, "fillImage": "", "fillColors": [{ "p": 0, "r": 144, "g": 200, "b": 255, "a": 1 }], "fillStartPos": { "x": 0, "y": 0 }, "fillEndPos": { "x": 0, "y": 0 } }, "rawWidth": symbol.bound.width, "rawHeight": symbol.bound.height, "symbolId": symbol.id, "offsetX": (symbol.bound.left + symbol.bound.right - symbol.cw - symbol.bound.width) / 2, "offsetY": (symbol.bound.top + symbol.bound.bottom - symbol.ch - symbol.bound.height) / 2, "rotateCenterX": symbol.bound.width / 2, "rotateCenterY": symbol.bound.height / 2, "strokeType": 0, "frameRate": 12, "lineCap": "round", "lineJoin": "round", "left": -symbol.bound.width, "right": 0, "top": 0, "bottom": symbol.bound.height, "scaleX": 1, "scaleY": 1, "rotate": 0, "lineWidth": 1, "alpha": 1, "strokeColor": "#0683ff", "startX": 0, "startY": 0, "endX": symbol.bound.width, "endY": symbol.bound.height, "width": symbol.bound.width, "height": symbol.bound.height }, "curve": { "closed": true, "points": [] }, "id": 0, "items": [], "aryAnchors": [] }
            //用这个anidata创建一个aobject对象
            //注意此时的unit、currectScene、currentScene.nameHash、thisAni、symbolList是错误的
            var obj = new aObject(anidata, null);
            // 用这个obj对象创建dom
            // step1：创建一个虚拟的scene对象
            var fakeScene = {};
            fakeScene.dom = document.createElement('div');
            fakeScene.objectHash = {};
            fakeScene.offset = {
                x: symbol.cw / 2 + (symbol.bound.left + symbol.bound.right - symbol.cw - symbol.bound.width) / 2,
                y: symbol.ch / 2 + (symbol.bound.top + symbol.bound.bottom - symbol.ch - symbol.bound.height) / 2
            };
            obj.currentScene = fakeScene;
            // step2用上述虚拟的scene作为父元素，生成symbol的dom树
            // 注意此时连接在fakeScene下面的dom是元件实例的dom
            // 此时obj.dom指向了元件实例的dom
            // fakeScene的objectHash保存了元件实例的guid（当然，是错误的）
            // 另外对于静态元素们，他们的位置错误的
            obj.initAndGetDom(fakeScene.dom, null);
            // step3将这个半对半错的symbol实例保存下来
            symbolObj.cachedInstance = obj
        });

        // 处理动画元素
        thisAni.scene = new Scene("_main", data, true, 0, { x: 0, y: 0 }, stage, false, null, null);
        thisAni.scene.initAndGetDom();

        thisAni.updateRuleCached();

        if (data.action === "behavior" && data.behavior) {
            this.handleBehavior(data.behavior, this.dom, this.id, this.scene);
        }

        // 隐藏所有unit
        for (var hash in thisAni.scene.unitHash) {
            if (thisAni.scene.unitHash[hash] instanceof Unit) thisAni.scene.unitHash[hash].updateUnitVisibility(false);
        }

        // 建立loading
        thisAni.loadingDiv = m("<div>").m_css("line-height", thisAni.dom.m_css("height"))
            .m_css("text-align", "center").m_css("background", "black").m_css("color", "white").m_css("font-family", "arial");
        thisAni.dom.insertBefore(thisAni.loadingDiv, thisAni.dom.firstChild);
        thisAni.loadingDiv.innerHTML = "Loading...";
        thisAni.loadingDiv.id = "loadingDiv";

        
        if (useTouch && thisAni.hasAPIAudio && false) {// 去掉黑屏
            var loadAudioDiv = m("<div>").m_css("line-height", thisAni.dom.m_css("height"))
                .m_css("text-align", "center").m_css("background", "black");
            thisAni.loadAudioDiv = loadAudioDiv;
            thisAni.dom.insertBefore(loadAudioDiv, thisAni.dom.firstChild);
            loadAudioDiv.innerHTML = '<img src="play_icon.png"/>';
            // if (thisAni.hasAPIAudio) loadAudioDiv.style.display = 'none';

            thisAni.countDownRef++;
            thisAni.maxNum = thisAni.countDownRef;
            loadAudioDiv.onclick = function () {
                this.style.display = "none";
                for (var hash in thisAni.audioList) {
                    var audio = thisAni.audioList[hash];
                    if (audio.webAudio || (audio.src && !audio.loadStatus)) {
                        audio.load();

                        if (audio.preload == "none")
                            setTimeout(function () { audio.checkAudioLoad() }, 250);

                        audio.loadStatus = 1;
                        if (!audio.webAudio && thisAni.iOS)
                            // Work around: on iOS only buffer the first audio
                            break;
                    }
                }

                thisAni.checkCountDownRef();
            }
        }
        else
            thisAni.playTriggered = true;
        // Assign body background color as the data.color
        // This is moved to loader.js, staying together with other body styles (e.g., margin)s
        // document.body.m_css("background", data.color);

        var stageDom = this.dom;
        function updateStagePosition() {
            _mrmcp = (typeof _mrmcp == 'undefined') ? {} : _mrmcp;
            var sz = Mugeda.getWindowSize();

            if (_mrmcp['render_mode'] != "inline" && _mrmcp['render_mode'] != "embedded" && sz.height > data.height)
                stageDom.m_css("margin-top", ((sz.height - data.height) / 2) + "px");
            if (_mrmcp['render_mode'] != "inline" && sz.width > data.width)
                stageDom.m_css("margin-left", ((sz.width - data.width) / 2) + "px");
        }
        updateStagePosition();

        // Center the stage
        window.addEventListener("resize", updateStagePosition);

        thisAni.setupTimer = function () {
            if (thisAni.timerSetted) return;
            // 建立FPS
            var setFPS;
            if (Mugeda.FPSMeter) {
                var fpsdiv = document.createElement("div");
                fpsdiv.style.cssText += "position: absolute; left: 0; right: 0; background:black; color:red; z-index:999999; width:2em;";
                setFPS = function (text) { fpsdiv.innerHTML = text.toString(); }
                this.dom.appendChild(fpsdiv);

                setInterval(function () {
                    if (Mugeda.FPSMeter) setFPS(thisAni.fpsFrame);
                    thisAni.fpsFrame = 0;
                }, 1000);
            }
            thisAni.fpsFrame = 0;


            thisAni.timerSetted = true;
            thisAni.lastFrameTime = m.getTime();
            thisAni.nextRenderTime = thisAni.lastFrameTime + thisAni.frameTime;
            thisAni.timeDuring = 0;
            // 建立timer
            for (var index in thisAni.paramUpdatePool) {
                var obj = thisAni.paramUpdatePool[index];
                obj.object.style.cssText += obj.text;
            }
            thisAni.paramUpdatePool = {};
            thisAni.dom.removeChild(thisAni.loadingDiv);
            // 建立一个小动画，以控制屏幕帧率
            if (Mugeda.enablePulse && Mugeda.pulse == null) {
                thisAni.insertRule("@" + m.css3Per + "keyframes MugedaPulse", "from {" + m.css3Per + "transform: translate(-100px,0px);}to {" + m.css3Per + "transform: translate(-99px,0px);}");
                thisAni.insertRule(".MugedaStamp", "margin-top:-1em;");
                Mugeda.pulse = m("<div>").m_addClass("MugedaStamp");
                var body = document.getElementsByTagName("body")[0];
                body.insertBefore(Mugeda.pulse, body.firstChild);
                Mugeda.pulse.innerHTML = "Mugeda";
                Mugeda.pulse.style[m.css3PerH + "Animation"] = "MugedaPulse 1s infinite"
            }
            // 获取该动画的父级DIV，查看是否有内联的renderReady，若有，引发回调
            var renderReady = thisAni.dom.m_attr("onRenderReady");

            /*
            for (var url in window.weixinAudioLoader) {
                window.weixinAudioLoader[url].play();
            }
            */
            

            if (renderReady) {
                eval(renderReady);
            }
            callEvent.call(thisAni, "renderReady");
            var _interval = function () {
                if (thisAni.stopRedraw) return;

                thisAni.fpsFrame++;

                var time0 = m.getTime();
                if (Mugeda.flexibleFrameRate) {
                    var timeDuring = time0 - thisAni.lastFrameTime;
                    if (timeDuring > thisAni.frameTime) timeDuring = thisAni.frameTime;
                    thisAni.timeDuring = timeDuring;
                }

                while (reDraw(thisAni.scene, true)) { /* console.log("drop:" + thisAni.scene.currentId) */ }

                var isEmpty = function (obj) {
                    for (var name in obj) {
                        return false;
                    }
                    return true;
                }
                if (updateObjectParamList.old || !isEmpty(thisAni.paramUpdatePool)) {

                    Mugeda.pulse && (Mugeda.pulse.style[m.css3PerH + "AnimationPlayState"] = "running");

                    if (updateObjectParamList.old) updateObjectParamTogether();

                    for (var index in thisAni.paramUpdatePool) {
                        var obj = thisAni.paramUpdatePool[index];
                        obj.object.style.cssText += obj.text;

                    }
                    thisAni.paramUpdatePool = {};

                    Mugeda.pulse && (Mugeda.pulse.style[m.css3PerH + "AnimationPlayState"] = "paused");
                }

                var time = m.getTime();
                if (Mugeda.flexibleFrameRate) {
                    var waitTime = 40 - (time - time0);
                    thisAni.lastFrameTime = time0;
                    thisAni.timeoutHandle = setTimeout(_interval, Math.max(waitTime, 0));
                }
                else {
                    thisAni.nextRenderTime += thisAni.frameTime;

                    if (time > thisAni.nextRenderTime) {
                        thisAni.nextRenderTime = time;
                    }
                    thisAni.timeoutHandle = setTimeout(_interval, thisAni.nextRenderTime - time);
                }
            }
            thisAni.timeoutHandle = setTimeout(_interval, 0);
        }

        thisAni.checkCountDownRef = function (noDown, async) {
            if (!noDown)
                --thisAni.countDownRef;

            function setup() {
                // 运行action脚本
                if (!thisAni.scriptExeced) {
                    thisAni.script = Mugeda.script[Mugeda.script.length - 1];
                    if (typeof (thisAni.script) == 'function') {
                        thisAni.script(thisAni);
                        thisAni.scriptExeced = true;
                    }
                }

                thisAni.loadOver.call(thisAni);
                thisAni.setupTimer();
            }

            if (thisAni.countDownRef == 0) {
                async ? setTimeout(setup, 10) : setup();
            }

            if (this.zoneLoadCallback) this.zoneLoadCallback((this.zoneLoadTotal - this.countDownRef) / this.zoneLoadTotal);

            return thisAni.countDownRef;
        }

        if (thisAni.zoneCachedMode) {
            thisAni.cacheZone(thisAni.zoneStart, thisAni.zoneEnd, null);
        }
        else {
            setTimeout(function () { thisAni.checkCountDownRef(true, true); }, 0);
        }



        var searchSymbol = function (objData) {
            if (objData.items) {
                for (var i = 0; i < objData.items.length; i++) {
                    var item = objData.items[i];
                    if (item.type == 2021) {
                        reDraw(thisAni.sceneHash[item.guid]);
                    }
                    else if (objData.type == 2014) {
                        searchSymbol(item);
                    }
                }
            }
        }

        if (typeof MugedaBehavior != "undefined")
            if (MugedaBehavior.processCloseButton) MugedaBehavior.processCloseButton();

        var reDraw = function (scene) {
            if (scene == null) return;
            //callEvent.call(scene, "beforedraw");
            if (scene.currentId == null || scene.gotoFlag) {
                scene.currentId = scene.nextId;
                scene.gotoFlag = false;
            }

            // 在这里计算每个物体的param
            //var showAnimation = true;

            //if (scene.id == "2y9x5n2zxd") m("#message").innerHTML = "frame id:" + scene.currentId;
            if (scene.pauseFlag && Mugeda.flexibleFrameRate) {
                scene.currentId = Math.floor(scene.currentId);
                scene.nextId = scene.currentId;
                scene.pauseFlag = false;
            }
            var frameId = scene.currentId;
            // console.log("frame: " + frameId);
            //
            // 建立一个列表，存储本scene本次redraw需要更新到屏幕的物体
            var needToUpdate = [];

            var intFrameId = Math.floor(frameId);

            var currentAudioCache = scene.cachedAudio ? (scene.cachedAudio[intFrameId] || []) : [],
                playingAudio = scene.playingAudio || [],
                nextPlayingAudio = {};
            for (var i = 0; i < currentAudioCache.length; i++) {
                var cachedAudio = currentAudioCache[i];
                var playingIndex = playingAudio[cachedAudio.hash];
                // 在播放列表中删去当前需要播放的hash
                if (playingIndex) {
                    delete playingAudio[cachedAudio.hash];
                }
                //if (cachedAudio.start && !cachedAudio.audio.error && cachedAudio.audio.loadStatus >= 0) {
                //if (!cachedAudio.audio.playStatus && !cachedAudio.audio.error && cachedAudio.audio.loadStatus >= 0) {
                if(true){
                    // 开始播放
                    // cachedAudio.audio.currentTime = 0;
                    if (cachedAudio.audio.playStatus != 1) {
                        cachedAudio.audio.play();
                        cachedAudio.audio.playStatus = 1;
                    }
                }
                nextPlayingAudio[cachedAudio.hash] = cachedAudio;
            }
            // playingAudio中剩下的都是需要停止的audio
            for (hash in playingAudio) {
                var audio = playingAudio[hash];
                if (!audio.audio) continue;
                audio = audio.audio;
                audio.pause();
                audio.playStatus = 0;
                audio.currentTime = 0;
                audio.playStatus = 0;
            }
            scene.playingAudio = nextPlayingAudio;
            //if (scene.id == "_main" && intFrameId == 1) debugger;
            // 控制物体的显示与否
            var currentVisCache = scene.cachedVisibility[intFrameId] || [];
            var nextRenderList = {};
            for (var i = 0; i < currentVisCache.length; i++) {
                if (!currentVisCache[i].userParam.visible) {
                    Mugeda.nonDisplay ? currentVisCache[i].hide() : (currentVisCache[i].dom.m_css("display", "none"));
                    continue;
                }
                if (scene.lastRenderList[currentVisCache[i].id]) {
                    scene.lastRenderList[currentVisCache[i].id] = false;
                }
                else {
                    Mugeda.nonDisplay ? currentVisCache[i].show() : (currentVisCache[i].dom.m_css("display", currentVisCache[i].dom["displayType"] || "block"));
                }
                nextRenderList[currentVisCache[i].id] = currentVisCache[i];


                if (updateObjectParamList[currentVisCache[i].id]) continue;



                if (scene.lastDrawId != frameId && currentVisCache[i].unit && currentVisCache[i].unit.data.keyframes.length > 1 && currentVisCache[i].unit.data.objects.length == 1) {

                    if (!scene.unitHash[currentVisCache[i].unit.id].cachedFrame[frameId]) {
                        var keyframe = TimelineUnit.getKeyframe(currentVisCache[i].unit.data, frameId);

                        if (keyframe) {
                            var prevKey = keyframe;
                            Param.exchange(keyframe.param, currentVisCache[i].data.param, true);
                        } else {
                            var param = TimelineUnit.getTweenParam(currentVisCache[i].unit.data, frameId);
                            if (param) Param.exchange(param, currentVisCache[i].data.param, true);
                        }

                        //if(frameId == 1) debugger
                        if (!Mugeda.flexibleFrameRate) {
                            var p = currentVisCache[i].data.param;
                            scene.unitHash[currentVisCache[i].unit.id].cachedFrame[frameId] = {
                                rawWidth: p.rawWidth,
                                rawHeight: p.rawHeight,
                                width: p.width,
                                height: p.height,
                                rotateCenterX: p.rotateCenterX,
                                rotateCenterY: p.rotateCenterY,
                                left: p.left,
                                top: p.top,
                                rotate: p.rotate,
                                alpha: p.alpha
                            };
                        }
                        //debugger;
                        //if (currentVisCache[i].unit.id == "qhljb3lh7") {
                        //    console.log(currentVisCache[i].dom);
                        //}

                    }
                    else {
                        var p = scene.unitHash[currentVisCache[i].unit.id].cachedFrame[frameId];
                        currentVisCache[i].data.param = {
                            rawWidth: p.rawWidth,
                            rawHeight: p.rawHeight,
                            width: p.width,
                            height: p.height,
                            rotateCenterX: p.rotateCenterX,
                            rotateCenterY: p.rotateCenterY,
                            left: p.left,
                            top: p.top,
                            rotate: p.rotate,
                            alpha: p.alpha
                        };
                    }

                    // 将物体param更新到缓存
                    //currentVisCache[i].updateObjectParam();
                    needToUpdate.push(currentVisCache[i]);
                }

                if (currentVisCache[i].symbolList) {
                    for (var j = 0; j < currentVisCache[i].symbolList.length; j++) {
                        var symbolScene = thisAni.sceneHash[currentVisCache[i].symbolList[j]];
                        var status = reDraw(symbolScene);
                        if (typeof (status) == "string") {
                            return status;
                        }
                        else {
                            needToUpdate = needToUpdate.concat(status);
                        }
                    }
                }

                if (scene.lastDrawId != frameId) {
                    var behavior =  currentVisCache[i].data.param.behaviorObj || currentVisCache[i].data.param.behavior;
                    if (currentVisCache[i].data.param.action == "behavior" && behavior) {
                        thisAni.handleBehavior(behavior, currentVisCache[i].dom, currentVisCache[i].id, scene, currentVisCache[i].unit);
                    }
                }

            }
            for (var guid in scene.lastRenderList) {
                if (scene.lastRenderList[guid]) {
                    Mugeda.nonDisplay ? scene.lastRenderList[guid].hide() : scene.lastRenderList[guid].dom.m_css("display", "none");
                }
            }
            scene.lastRenderList = nextRenderList;

            if (scene.playing && (!scene.gotoFlag)) {
                if (Mugeda.flexibleFrameRate) {
                    scene.nextId = scene.currentId + thisAni.timeDuring / thisAni.frameTime;
                }
                else {
                    scene.nextId++;
                }
            }

            //callEvent.call(scene, "afterdraw");

            callEvent.call(scene, "enterframe");
            //callEvent.call(scene, "enterFrame");

            while (scene.frameout.length && scene.frameout[0].time == 0) {
                var fun = scene.frameout[0].fun;
                scene.frameout.splice(0, 1);
                fun.call(scene);

            }
            if (scene.frameout.length) scene.frameout[0].time--;

            if (scene.currentSegment && scene.currentSegment.from != undefined) {
                var seg = scene.currentSegment;
                if (scene.nextId > seg.to) {
                    if (seg.isLoop) {
                        scene.gotoAndPlay(scene.currentSegment.from);
                    }
                    else {
                        scene.gotoAndPause(seg.to);
                        if (scene.lastDrawId != frameId) callEvent.call(scene, "segmentend");
                    }
                }
            }
            else if (scene.nextId >= scene.length) {
                if (scene.id == "_main" && !thisAni.aniData.loop) {
                    scene.nextId = scene.length - 1;
                }
                else if (scene.looped == false) {
                    scene.nextId = scene.length - 1;
                }
                else {
                    scene.nextId = 0;
                    showAnimation = false; // 目前屏蔽了transition，所以这个无效
                }
            }

            scene.currentId = scene.nextId;
            scene.lastDrawId = frameId;

            // 当在变帧率模式时，监测到pauseFlag，无效本次redraw
            if (scene.pauseFlag) {
                if (Mugeda.flexibleFrameRate && frameId != intFrameId) {
                    return "inval";
                }
            }

            if (scene.id != "_main") return needToUpdate;
            else {
                for (var i = 0; i < needToUpdate.length; i++) {
                    needToUpdate[i].updateObjectParam();
                }
                return null;
            }

        }

        css3Ani.prototype.createInstanceOfSymbol = function (symbolName, instanceName) {
            var symbol = thisAni.symbolsName[symbolName];
            if (symbol) {
                //var symbolImplement = new Scene(guid, symbol, true, 0, { x: 0, y: 0 }, dom, true);
                var data = { "guid": Mugeda.guidGen(), "type": 2021, "param": { "name": instanceName, "fillInfo": { "fillStyle": 0, "fillImage": "", "fillColors": [{ "p": 0, "r": 144, "g": 200, "b": 255, "a": 1 }], "fillStartPos": { "x": 0, "y": 0 }, "fillEndPos": { "x": 0, "y": 0 } }, "rawWidth": symbol.bound.width, "rawHeight": symbol.bound.height, "symbolId": symbol.id, "offsetX": (symbol.bound.left + symbol.bound.right - symbol.cw - symbol.bound.width) / 2, "offsetY": (symbol.bound.top + symbol.bound.bottom - symbol.ch - symbol.bound.height) / 2, "rotateCenterX": symbol.bound.width / 2, "rotateCenterY": symbol.bound.height / 2, "strokeType": 0, "frameRate": 12, "lineCap": "round", "lineJoin": "round", "left": -symbol.bound.width, "right": 0, "top": 0, "bottom": symbol.bound.height, "scaleX": 1, "scaleY": 1, "rotate": 0, "lineWidth": 1, "alpha": 1, "strokeColor": "#0683ff", "startX": 0, "startY": 0, "endX": symbol.bound.width, "endY": symbol.bound.height, "width": symbol.bound.width, "height": symbol.bound.height }, "curve": { "closed": true, "points": [] }, "id": 0, "items": [], "aryAnchors": [] }
                var obj = new aObject(data, null);
                return obj;
            }
        }

        css3Ani.prototype.unloadAnimation = function () {
            this.stopRedraw = true;
            if (this.dom) {
                this.dom.parentNode.removeChild(this.dom);
            }
        }


    }

    css3Ani.prototype.checkLoad = function (decrease) {
        if (decrease) { --this.imageNum; }
        if (this.zoneLoadCallback) this.zoneLoadCallback((this.zoneLoadTotal - this.imageNum) / this.zoneLoadTotal);
        if (this.imageNum == 0) {
            this.loadOver.call(this);
            this.setupTimer();
        }
    }

    css3Ani.prototype.loadAudio = function (param) {
        css3Ani.prototype.loadImage('audio', param);
    }
    css3Ani.prototype.loadImage = function (type, param, priority) {
        if (priority == null) priority = 0;
        //console.log(this.countDownRef)
        var thisAni = this;
        thisAni.countDownRef = thisAni.countDownRef || 0;
        if (type == 'dom_back') {

            var dom = param.dom,
                url = param.url,
                duringBuilding = param.duringBuilding || false,
                cacheZone = param.cacheZone || false;


            // 若已经缓存
            if (thisAni.imageCache[url]) {
                // 如加载完成，则直接返回
                if (thisAni.imageCache[url].loaded) {
                    //if (dom.m_css) dom.m_css("background-image", "url(" + url + ")");
                    if (dom) dom.src = url;
                    return false;
                }
                    // 若没有加载完成，则加入更新列表
                else {
                    if (cacheZone) {
                        if (thisAni.imageCache[url].loading) return false;
                        var image = new Image();
                        image.src = url;
                        image.url = url;
                        thisAni.imageCache[url].loaded = true;
                        //thisAni.imageNum++;
                        thisAni.countDownRef++;
                        thisAni.maxNum = thisAni.countDownRef;
                        image.m_event('load', function () {
                            //thisAni.checkLoad(true);
                            thisAni.checkCountDownRef();
                            //thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                            thisAni.imageCache[this.url].dom.m_operate(function () {
                                //this.m_css("background-image", "url(" + url + ")");
                                this.src = url;
                            });

                        }).m_event("error", function () {
                            console.log("Error when loading image: " + image.src);
                            //thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                            //thisAni.checkLoad(true);
                            thisAni.checkCountDownRef();
                        });
                        thisAni.imageCache[url].loading = true;
                        return true;
                    }
                    else {
                        thisAni.imageCache[url].dom.push(dom);
                        if (duringBuilding && param.scene && param.scene.id == "_main") {
                            param.unit.imageList[url] = thisAni.imageCache[url];
                        }
                        return false;
                    }
                }
            }
                // 若没有缓存
            else {
                // 如果开启分段加载模式，且处于建立文档时，则只记录dom
                if (duringBuilding) {
                    thisAni.imageCache[url] = {
                        image: null,
                        url: url,
                        dom: [dom],
                        loaded: false,
                        duringBuilding: true
                    }
                    if (param.scene && param.scene.id == "_main") {
                        param.unit.imageList[url] = thisAni.imageCache[url];
                    }
                    return false;
                }
                else {
                    var image = new Image();
                    image.src = url;
                    image.url = url;
                    thisAni.imageCache[url] = {
                        image: image,
                        dom: [dom],
                        loaded: false
                    }
                    //thisAni.imageNum++;
                    thisAni.countDownRef++;
                    thisAni.maxNum = thisAni.countDownRef;
                    image.m_event('load', function () {
                        //thisAni.checkLoad(true);
                        thisAni.imageCache[this.url].loaded = true;
                        thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                        thisAni.checkCountDownRef();
                        thisAni.imageCache[this.url].dom.m_operate(function () {
                            //this.m_css("background-image", "url(" + url + ")");
                            this.src = url;
                        });

                    }).m_event("error", function () {
                        thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                        thisAni.checkCountDownRef();
                        console.log("Error when loading image: " + image.src);
                        //thisAni.checkLoad(true);
                    });
                    return true;
                }
            }
        }
        else if (type == 'script') {
            //thisAni.imageNum++;
            thisAni.countDownRef++;
            thisAni.maxNum = thisAni.countDownRef;

            thisAni.scriptList[priority] = thisAni.scriptList[priority] || []
            thisAni.scriptList[priority].push(param);

            if (typeof (currentPriority) != 'undefined') {
                return Mugeda.loadJs(param);
            }

            var currentPriority = -1;

            if (thisAni.scriptLoadTimer) return;
            thisAni.scriptLoadTimer = setTimeout(function () {

                var doLoadScript = function (i) {
                    if (i >= thisAni.scriptList.length) return;
                    var scs = thisAni.scriptList[i];
                    if (!scs) doLoadScript(++i);
                    var scsCounter = scs.length;
                    for (var j = 0; j < scs.length; j++) {
                        var sc = scs[j];
                        Mugeda.loadJs(sc, function () {
                            thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                            thisAni.checkCountDownRef();
                            if (--scsCounter == 0) {
                                doLoadScript(++i);
                            }
                        }, function () {
                            console.log("Error when loading user script");
                            //thisAni.checkLoad(true);
                            thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                            thisAni.checkCountDownRef();
                            if (--scsCounter == 0) {
                                doLoadScript(++i);
                            }
                        })
                    }
                }

                doLoadScript(++currentPriority);

                /*
                Mugeda.loadJs(param, function () {
                    thisAni.script = Mugeda.script[Mugeda.script.length - 1];
                    thisAni.script(thisAni);
                    //thisAni.checkLoad(true);
                    thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                    thisAni.checkCountDownRef();
                }, function () {
                    console.log("Error when loading user script");
                    //thisAni.checkLoad(true);
                    thisAni.loadingDiv.innerHTML = "Loading..." + (thisAni.maxNum - thisAni.countDownRef + 1) + "/" + thisAni.maxNum;
                    thisAni.checkCountDownRef();
                })
                */
            });


        }
        else if (type = 'audio') {
            //
        }
    }

    // 缓存指定帧数的资源
    css3Ani.prototype.cacheZone = function (from, to, symbolList, callback) {
        var thisAni = this;
        if (to == null || to < from) to = from;
        if (from < 1) from = 1;
        if (to > thisAni.scene.length) to = thisAni.scene.length;
        if (symbolList == null) symbolList = [];
        thisAni.zoneCachedMode = true;
        thisAni.zoneLoadCallback = callback || function () { };

        // 扫描帧数，确定需要的帧
        var symbolToCache = {}, imageToCache = {}, loadNum = 0;
        for (var id = from - 1; id < to; id++) {
            // 如果这个帧被缓存，则继续
            if (thisAni.zoneCached[id]) continue;
                // 否则，展开这个帧
            else {
                var unitList = thisAni.mainSceneFrameUnitHash[id];
                // 查看unit是否缓存
                unitList.m_operate(function () {
                    var unit = this;
                    // unit如果缓存了
                    if (unit.zoneCached) {

                    }
                        // unit如果没有缓存
                    else {
                        // 首先列出所有的symbol
                        var symbols = unit.symbolList;
                        symbols.m_operate(function () {
                            if (thisAni.symbols[this.toString()]) symbolToCache[this.toString()] = thisAni.symbols[this.toString()];
                        });

                        symbolList.m_operate(function () {
                            var name = this.toString();
                            symbolToCache[thisAni.symbolsName[name].id] = thisAni.symbolsName[name];
                        });

                        // 然后列出所有的图片
                        var images = unit.imageList;
                        for (url in images) {
                            if (images[url].loaded == false) imageToCache[url] = images[url]
                        }
                        // 开始缓存元件
                        for (var guid in symbolToCache) {
                            var symbolObject = symbolToCache[guid];
                            if (symbolObject.zoneCached == false) {
                                symbolObject.imageList.m_operate(function () {
                                    var url = this.toString();
                                    if (!imageToCache[url]) imageToCache[url] = {
                                        dom: [],
                                        url: url
                                    }

                                });
                                symbolObject.zoneCached = true;
                            }
                        }

                        // 开始缓存图片
                        //console.log(symbolToCache, imageToCache)
                        for (var url in imageToCache) {
                            var imageObject = imageToCache[url];
                            if (imageObject.url) {
                                if (thisAni.loadImage('dom_back', { url: url, cacheZone: true, dom: [] })) {
                                    loadNum++;
                                }
                            }
                        }

                        unit.zoneCached = true;
                    }
                });
                thisAni.zoneCached[id] = true;
            }
        }
        thisAni.zoneLoadTotal = loadNum

        if (loadNum == 0) {
            var val = (this.zoneLoadTotal - this.countDownRef) / this.zoneLoadTotal;
            thisAni.zoneLoadCallback(val ? val : 1);
        }


    }

    var getGuidFromDom = function (dom) {
        var cla = dom.className;
        var st = cla.indexOf("guid");
        if (st > -1) {
            var ed = cla.indexOf(" ", st);
            if (ed == -1)
                return cla.substr(st)
            else
                return cla.substr(st, ed - st);
        }
        else {
            var guid = "guid_" + Mugeda.guidGen();
            dom.m_addClass(guid);
            return guid;
        }
    }

    css3Ani.prototype.insertRuleCached = function (obj, cssText) {
        if (this.cachedRule) {
            this.cachedRule.push({ obj: obj, cssText: cssText });
        }
        else {
            this.insertRule("." + getGuidFromDom(obj), cssText);
        }
    }

    css3Ani.prototype.updateRuleCached = function () {
        for (var i = 0; i < this.cachedRule.length; i++) {
            var item = this.cachedRule[i];
            this.insertRule("." + getGuidFromDom(item.obj), item.cssText);
        }
        this.cachedRule = null;
    }

    css3Ani.prototype.insertRule = function (selectorText, cssText) {
        var sheet = this.externalStylesheet;
        var inSheet = this.indexedStylesheet;
        if (inSheet[selectorText]) {
            inSheet[selectorText].style.cssText += cssText;
        }
        else {
            //如果是非IE
            var index = 0;
            var length = sheet.rules ? sheet.rules.length : sheet.cssRules.length;
            if (sheet.insertRule) {
                index = sheet.insertRule(selectorText + "{" + cssText + "}", length);
                //如果是IE 
            } else if (sheet.addRule) {
                index = sheet.addRule(selectorText, cssText, length);
            }
            inSheet[selectorText] = sheet.rules ? sheet.rules[index] : sheet.cssRules[index];
        }
    }

    css3Ani.prototype.handleBehavior = function (behavior, dom, hash, currentScene, unit) {
        var thisAni = this;
        var beList = typeof behavior == 'string' ? JSON.parse(behavior) : behavior;
        beList.m_operate(function (be, index) {
            var fun = null;
            be.unit = unit ? (unit.data || {}) : {};
            be.param = be.param || {};
            var sc = (be.param.scope == "symbol" ? currentScene : thisAni.scene);
            if (be.type == "play") {
                fun = function () { sc.play.call(sc) };
            }
            else if (be.type == "pause") {
                fun = function () { sc.pause.call(sc) };
            }
            else if (be.type == "gotoAndPlay") {
                var id = parseInt(be.param.frame_number);
                fun = function () { sc.gotoAndPlay.call(sc, parseInt(be.param.frame_number) - 2 + 1); }
            }
            else if (be.type == "gotoAndStop" || be.type == "gotoAndPause") {
                var id = parseInt(be.param.frame_number);
                fun = function () { sc.gotoAndPause.call(sc, parseInt(be.param.frame_number) - 1 + 1); }
            }
            else if (be.type == "next") {
                var id = parseInt(be.param.frame_number);
                fun = function () { sc.gotoAndPause.call(sc, Math.min(sc.length, sc.currentId + 1 + 1)); }
            }
            else if (be.type == "previous") {
                var id = parseInt(be.param.frame_number);
                fun = function () { sc.gotoAndPause.call(sc, Math.max(1, sc.currentId - 1 + 1)); }
            }
            else if (be.type == "callback") {
                // Leave it to MugedaBehavior.processAction
                // fun = window[be.param.name];
            }
            else if (be.type == "audio") {
                if (be.param.audio_id) be.param.audio_url = thisAni.audioSym[be.param.audio_id];
            }
            else if (be.type == "stopAllAudio") {
                fun = function () {
                    for (var id in thisAni.audioList) {
                        var au = thisAni.audioList[id];
                        au.pause();
                        au.currentTime = 0;
                    }
                }
            }
            if (be.event == "click") {
                if (!sc.clickEventAttached[hash + "_" + index]) {
                    dom.m_css("cursor", "pointer");
                    dom.m_event(useTouch ? "touchend" : "mouseup", function (event) {
                        MugedaBehavior.processAction(be, 'click', true);
                        if (fun) fun.call();

                        // Stop bubbling up. 
                        event.preventDefault();
                        event.stopPropagation();

                        return false;
                    });

                    sc.clickEventAttached[hash + "_" + index] = true;
                }
            }
            else if (be.event == "appear") {
                if (fun)
                    fun();
                else
                    MugedaBehavior.processAction(be, 'appear', true);
            }
        });
    }

    window.HTMLElement.prototype.m_attr = function (name, value) {
        if (typeof value != "undefined") {
            this.setAttribute(name, value);
            return this;
        }
        return this.getAttribute(name);
    }

    window.HTMLElement.prototype.m_addClass = function (value) {
        if (value && typeof value === "string") {
            if (!this.className) {
                this.className = value;
            }
            else {
                this.className = this.className + " " + value;
            }
        }
        return this;
    }

    window.HTMLElement.prototype.m_removeClass = function (value) {
        if (value && typeof value === "string") {
            if (this.className) {
                var exp = new RegExp('(' + value + '\\s)|(\\s*' + value + ')');
                this.className = this.className.replace(exp, "");
            }
        }
        return this;
    }

    window.HTMLElement.prototype.m_event = function (event, callback, useCapture) {
        if (/(transition)|(other)/.test(event)) event = m.css3Per + (m.css3Per ? event.substr(0, 1).toUpperCase() : event.substr(0, 1)) + event.substr(1);
        this.addEventListener(event, callback, useCapture || false);
        return this;
    }


    var toCss3Name = function (name) {
        //return m.css3Per + (m.css3Per ? name.substr(0, 1).toUpperCase() : name.substr(0, 1)) + name.substr(1);
        return m.css3Per + name;
    }
    var css3name = {
        transform: toCss3Name("transform"),
        transition: toCss3Name("transition"),
        textStroke: toCss3Name("textStroke"),
        textFillColor: toCss3Name("textFillColor"),
        "transform-origin": toCss3Name("transform-origin")
    }
    window.HTMLElement.prototype.m_css = function (name, value, thisAni) {
        //name = name.replace(/(-.)/ig, function (a) { return a.substr(1).toUpperCase() })
        if (css3name[name]) {
            name = css3name[name];
        }
        if (value != undefined) {
            if (thisAni) {
                if (this.guid == null) this.guid = Mugeda.guidGen();
                if (thisAni.paramUpdatePool[this.guid] == null) thisAni.paramUpdatePool[this.guid] = { object: this, text: "" };
                thisAni.paramUpdatePool[this.guid].text += (name + ":" + value + ";");
            }
            else {
                if (name.indexOf("opacity") > -1 || name.indexOf("tran") > -1 || (!Mugeda.nonDisplay && name.indexOf("display") > -1) || (!Mugeda.nonDisplay && name.indexOf("vertical") > -1)) {
                    this.style.cssText += (name + ":" + value + ";");
                }
                else {
                    Mugeda.currentAni.insertRuleCached(this, name + ":" + value + ";");
                }
            }
        }
        else {
            // return this.style[name];
            return m.getCurrentStyle(this, name);
        }
        return this;

    }

    window.HTMLElement.prototype.m_width = function (value) {
        if (value != undefined) return this.m_css('width', value + "px");
    }

    window.HTMLElement.prototype.m_height = function (value) {
        if (value != undefined) return this.m_css('height', value + "px");
    }

    //
    window.HTMLElement.prototype.m_transform = function (x, y, r, sx, sy, rx, ry) {
        /*var trans = this.m_css("transform"),
            reg = /(\b\w+)\((\S+)\)/g,*/
        data = {};
        /*while (re = reg.exec(trans)) {
            data[re[1]] = re[2];
        }
        */
        if (x != null) data["translateX"] = x.toString() + "px";
        if (y != null) data["translateY"] = y.toString() + "px";
        if (r != null) data["rotate"] = r.toString() + "rad";
        if (sx != null) data["scaleX"] = sx.toString();
        if (sx != null) data["scaleY"] = sy.toString();

        if (Mugeda.threeDRendering) {
            data["translateZ"] = "0px";
        }

        var text = "";
        for (var item in data) {
            text += (item + "(" + data[item] + ") ");
        }

        if (rx != null || ry != null) {
            this.m_css("transform-origin", (Math.abs(rx) < 0.01 ? 0 : Math.floor(100 * rx) * 0.01) + "px " + (Math.abs(ry) < 0.01 ? 0 : Math.floor(100 * ry) * 0.01) + "px");
        }

        return this.m_css("transform", text);
    }

    window.HTMLElement.prototype.m_append = function (dom, beforeDom) {
        if (dom instanceof window.HTMLElement) {
            if (beforeDom) this.insertBefore(dom, beforeDom);
            else this.appendChild(dom);
        }
        return this;
    }

    window.HTMLElement.prototype.m_appendTo = function (dom) {
        if (dom instanceof window.HTMLElement) dom.appendChild(this);
        return this;
    }

    window.HTMLElement.prototype.m_setCapture = function (capture) {
        MugedaCss3.captureObject = { object: this, capture: capture == undefined ? true : capture };
        return this;
    }
    window.HTMLElement.prototype.m_releasecapture = function (capture) {
        MugedaCss3.captureObject = null;
        return this;
    }

    Array.prototype.m_operate = function (callback, revise) {
        for (var i = (revise ? this.length - 1 : 0) ; (revise && i >= 0) || (!revise && i < this.length) ; (revise ? i-- : i++)) {
            if (callback.call(this[i], this[i], i) == false) break;
        }
    }

    String.prototype.m_trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }

    return m;
})(window.MugedaCss3)

var MugedaCompress = {
    keys: [
        'Ac', 'action',
        'fM', 'form',
        'tt', 'title',
        'wt', 'width',
        'ht', 'height',
        'cl', 'color',
        'sm', 'symbols',
        'ly', 'layers',
        'vr', 'version',
        'sC', 'scripts',
        'zI', 'zoomInfo',
        'pd', 'pid',
        'tp', 'type',
        'nm', 'name',
        'un', 'units',
        'lI', 'layerId',
        'fS', 'frameStart',
        'fC', 'frameCount',
        'ad', 'animated',
        'vb', 'visible',
        'ob', 'objects',
        'pm', 'param',
        'fI', 'fillInfo',
        'cv', 'curve',
        'kf', 'keyframes',
        'md', 'mode',
        'tw', 'tween',
        'hK', 'hashKey',
        'ix', 'index',
        'rW', 'rawWidth',
        'rH', 'rawHeight',
        'sI', 'symbolId',
        'oX', 'offsetX',
        'oY', 'offsetY',
        'rX', 'rotateCenterX',
        'rY', 'rotateCenterY',
        'it', 'items',
        'nI', 'nodeId',
        'gP', 'guidPath',
        'ph', 'path',
        'gi', 'guid',
        'sm', 'smooth',
        'iX', 'innerX',
        'iY', 'innerY',
        'uX', 'outerX',
        'uY', 'outerY',
        'cX', 'centerX',
        'cY', 'centerY',
        'ed', 'edges',
        'st', 'section',
        'fZ', 'fontSize',
        'fT', 'fontStyle',
        'fW', 'fontWeight',
        'fF', 'fontFamily',
        'tA', 'textAlign',
        'tC', 'textContent',
        'tD', 'textDecoration',
        'cR', 'cornerRadius',
        'iS', 'imageSrc',
        'lC', 'lineCap',
        'lJ', 'LineJoin',
        'fR', 'frameRate',
        'iP', 'innerPercent',
        'TA', 'trackAnchors',
        'MT', 'mugedaTrackAnchors'
    ],

    unzip: function (data) {
        if (!data) return data;
        if (data.zip != 1) return HaniData.unzip(data);
        var ret = JSON.parse(JSON.stringify(data));
        ret = MugedaCompress.unzipKey(ret);
        delete (ret.zip);
        if (ret.rate == undefined) ret.rate = 12;
        if (ret.width == undefined) ret.width = 600;
        if (ret.height == undefined) ret.height = 400;
        if (ret.guid == undefined) ret.guid = "";
        if (ret.title == undefined) ret.title = "";
        if (ret.script == undefined) ret.script = "";
        if (ret.loop == undefined) ret.loop = true;
        if (ret.useCamera == undefined) ret.useCamera = false;
        if (ret.symbols == undefined) ret.symbols = [];
        if (ret.symbols.length) {
            var symbols = ret.symbols;
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                symbol.runtime = true;
                symbol.dirtyFlag = false;
                MugedaCompress.unzipLayers(symbol.layers);
            }
        }
        MugedaCompress.unzipZoomInfo(ret);
        MugedaCompress.unzipLayers(ret.layers);
        return ret;
    },

    unzipKey: function (data) {
        var reg;
        data = JSON.stringify(data);
        for (var i = 0; i < MugedaCompress.keys.length; i += 2) {
            reg = eval('/"' + MugedaCompress.keys[i] + '"\:/g');
            data = data.replace(reg, '"' + MugedaCompress.keys[i + 1] + '":');
        }
        return JSON.parse(data);
    },

    unzipZoomInfo: function (data) {
        var zoomInfo = [];
        var a = data.zoomInfo.split(',') || [];
        for (var i = 0; i < a.length; i += 4) {
            var idx = a[i];
            if (idx.indexOf('i') == 0) {
                idx = idx.substr(1);
                i++;

                var tween = a[i];
                if (tween.indexOf('t') == 0) {
                    tween = tween.substr(1);
                    i++;
                }
                else
                    tween = null;

                zoomInfo[idx] = {
                    offsetLeft: Number(a[i]),
                    offsetTop: Number(a[i + 1]),
                    rotation: Number(a[i + 2]),
                    zoomLevel: Number(a[i + 3])
                };
                if (tween)
                    zoomInfo[idx].tween = tween;
            }
        }
        data.zoomInfo = zoomInfo;
    },

    unzipLayers: function (layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            layer.hide = false;
            layer.lock = false;
            var units = layer.units;
            for (var j = 0; j < units.length; j++) {
                var unit = units[j];
                if (unit.animated) {
                    MugedaCompress.unzipPath(unit);
                } else {
                }
                var keyframes = unit.keyframes || [];
                for (var k = 0; k < keyframes.length; k++) {
                    var param = keyframes[k].param;
                    MugedaCompress.unzipParam(param);
                }
                if (unit.visible == undefined) unit.visible = true;
                MugedaCompress.unzipObjects(unit.objects);
            }
        }
    },

    unzipPath: function (unit) {
        var a = unit.path.split(',');
        var path = [];
        var pathLeft = a.shift();
        var pathTop = a.shift();
        for (var i = 0; i < a.length; i += 7) {
            path.push({
                id: Number(a[i]),
                backwardX: Number(a[i + 1]),
                backwardY: Number(a[i + 2]),
                forwardX: Number(a[i + 3]),
                forwardY: Number(a[i + 4]),
                nodeX: Number(a[i + 5]),
                nodeY: Number(a[i + 6])
            });
        }

        if (path.length) {
            unit.pathLeft = Number(pathLeft);
            unit.pathTop = Number(pathTop);
            unit.path = path;
        } else {
            delete (unit.path);
            delete (unit.pathLeft);
            delete (unit.pathTop);
        }
    },

    unzipObjects: function (objects) {
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            if (object.items && object.items.length) {
                MugedaCompress.unzipObjects(object.items);
            } else {
                object.id = 0;
                object.name = "";
                object.items = [];
                object.aryAnchors = [];
            }
            MugedaCompress.unzipCurve(object);
            MugedaCompress.unzipParam(object.param);
        }
    },

    unzipCurve: function (object) {
        var curve = object.curve;
        if (typeof curve != 'string') return;
        object.curve = {};
        var pts = curve.split(',');
        var closed = pts.shift() == 1;
        object.curve.closed = closed;
        var points = [];
        for (var i = 0; i < pts.length; i += 6) {
            points.push({
                backwardX: Number(pts[i]),
                backwardY: Number(pts[i + 1]),
                forwardX: Number(pts[i + 2]),
                forwardY: Number(pts[i + 3]),
                nodeX: Number(pts[i + 4]),
                nodeY: Number(pts[i + 5])
            });
        }
        object.curve.points = points;
    },

    unzipParam: function (param) {
        if (param.strokeType == undefined) param.strokeType = 0;
        if (param.frameRate == undefined) param.frameRate = 12;
        if (param.lineCap == undefined) param.lineCap = 'round';
        if (param.lineJoin == undefined) param.lineJoin = 'round';

        // if (param.customPivot == undefined) param.customPivot = true;
        var m = param.m.split(';');
        for (var i = 0; i < m.length; i++) {
            var key = m[i].substr(0, 1);
            var value = m[i].substr(1);
            switch (key) {
                case 'L': param.left = Number(value); break;
                case 'R': param.right = Number(value); break;
                case 'T': param.top = Number(value); break;
                case 'B': param.bottom = Number(value); break;

                case 'S': param.startX = Number(value); break;
                case 'P': param.startY = Number(value); break;
                case 'E': param.endX = Number(value); break;
                case 'N': param.endY = Number(value); break;

                case 'X': param.scaleX = Number(value); break;
                case 'Y': param.scaleY = Number(value); break;
                case 'O': param.rotate = Number(value); break;
                case 'W': param.lineWidth = Number(value); break;
                case 'A': param.alpha = Number(value); break;
                case 'C': param.strokeColor = value; break;
            }
        }
        if (param.startX == undefined) param.startX = param.left;
        if (param.startY == undefined) param.startY = param.top;
        if (param.endX == undefined) param.endX = param.right;
        if (param.endY == undefined) param.endY = param.bottom;

        param.width = param.right - param.left;
        param.height = param.bottom - param.top;
        delete (param.m);
        MugedaCompress.unzipFillInfo(param);
    },

    unzipFillInfo: function (param) {
        if (!param.fillInfo) return;
        var a = param.fillInfo.split(';');
        var fillStyle = Number(a[0]);
        var cols = a[1].split(',');
        var fillImage = a[3];
        var fillColors = [];
        for (var i = 0; i < cols.length; i += 5) {
            fillColors.push({
                p: Number(cols[i]),
                r: Number(cols[i + 1]),
                g: Number(cols[i + 2]),
                b: Number(cols[i + 3]),
                a: Number(cols[i + 4])
            });
        }
        var fillInfo = {
            fillStyle: fillStyle,
            fillImage: fillImage,
            fillColors: fillColors
        };
        var pos = a[2].split(',');
        if (pos.length != 4) pos = [0, 0, 0, 0];
        fillInfo.fillStartPos = {
            x: Number(pos[0]),
            y: Number(pos[1])
        }
        fillInfo.fillEndPos = {
            x: Number(pos[2]),
            y: Number(pos[3])
        }
        param.fillInfo = fillInfo;
    }
};

var TimelineUnit = {
    getKeyframe: function (unit, frameid) {
        var key = unit.hashKey['key_' + frameid];
        if (!key) key = null;

        return key;
    },
    getTweenParam: function (unit, frameid) {
        var len = unit.keyframes.length;
        var key1 = unit.keyframes[0];
        var key2 = null;
        var param = null;
        var idx1 = 0;
        var idx2 = -1;

        var createParam = function () {
            var createColorStop = function (p, r, g, b, a) {
                return {
                    // 颜色位置。取值从0.0到1.0。
                    p: p,

                    // r,g,b,a, 红、绿、蓝、透明度。取值从0到255
                    r: r,
                    g: g,
                    b: b,
                    a: a
                };
            };

            var createFillInfo = function () {
                // 填充信息
                var fillInfo = {
                    // 填充模式: 0(纯色), 1(线性渐变), 2(环形渐变), 3(图形填充), 4(透明)
                    fillStyle: 0,

                    // 当 fillStyle = 3, 此处为填充图形的地址
                    fillImage: "",

                    // 填充起始色块位置的坐标值，以物体局部坐标为准
                    fillStartPos: {
                        x: 32,
                        y: 10
                    },

                    // 填充终止色块位置的坐标值，以物体局部坐标为准
                    fillEndPos: {
                        x: 80,
                        y: 100
                    },

                    // fillColors是一个颜色值的数组。数组每一个元素的定义见colorStop变量
                    fillColors: [createColorStop(0, 144, 200, 255, 1), createColorStop(0.8, 255, 144, 200, 1), createColorStop(1, 200, 255, 144, 1)]
                };

                return fillInfo;
            };

            var native_param = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,

                startX: 0,
                startY: 0,
                endX: 0,
                endY: 0,

                width: 0,
                height: 0,

                alpha: 1,
                rotate: 0,
                scaleX: 1.,
                scaleY: 1.,

                lineWidth: 1,
                strokeType: 0,
                strokeColor: "#0683ff",

                lineCap: 'round', // [butt,round,square]
                lineJoin: 'round', // [round,bevel,miter]
                fillInfo: createFillInfo()
            };

            return native_param;
        };

        bezierInterpolate = function (t0, t1, p0, p1, p2, p3) {
            var val = Math.pow(t1, 3) * p0 + 3 * Math.pow(t1, 2) * t0 * p1 +
                      3 * t1 * Math.pow(t0, 2) * p2 + Math.pow(t0, 3) * p3;

            return val;
        };

        var bezierGetPoint = function (p1, p2, r0) {
            var r1 = 1 - r0;
            var p0X = p1.nodeX;
            var p0Y = p1.nodeY;
            var p1X = p1.forwardX;
            var p1Y = p1.forwardY;
            var p2X = p2.backwardX;
            var p2Y = p2.backwardY;
            var p3X = p2.nodeX;
            var p3Y = p2.nodeY;

            var x = bezierInterpolate(r0, r1, p0X, p1X, p2X, p3X);
            var y = bezierInterpolate(r0, r1, p0Y, p1Y, p2Y, p3Y);

            return { 'x': x, 'y': y };
        };

        if (len > 1 && !unit.hashKey['key_' + frameid]) {
            for (var i = 1; i < len; i++) {
                key2 = unit.keyframes[i];
                if (key2.id > frameid) {
                    idx2 = i;
                    break;
                }
                key1 = key2;
                idx1 = i;
                key2 = null;
            }
            if (key2) {
                var count = Math.abs(key2.id - key1.id);
                var index = frameid - key1.id;
                //var factor = (frameid - key1.id) / count;
                var factor = TimelineUnit.getTweenFactors(count, key1.tween);
                if (Mugeda.flexibleFrameRate) {
                    factor.push(1);
                    var indexMin = Math.floor(index);
                    var indexMax = Math.ceil(index)
                    var factorMin = factor[indexMin];
                    var factorMax = factor[indexMax];
                    if (indexMax == indexMin) factor = factorMax;
                    else factor = (index - indexMax) * (factorMax - factorMin) / (indexMax - indexMin) + factorMax;
                }
                else {
                    factor = factor[index];
                }
                param = createParam();
                Param.tweenParam(param, key1.param, key2.param, factor);

                if (unit.pathMode > Hanimation.PATHMODE_DEFAULT && idx1 >= 0 && idx2 >= 0) {
                    //var obj = getPathObject(unit);
                    //var objParam = obj.getParam();
                    var points = unit.path;
                    var pt = bezierGetPoint(points[idx1], points[idx2], factor);

                    pt.x = unit.pathLeft + pt.x - param.rotateCenterX;
                    pt.y = unit.pathTop + pt.y - param.rotateCenterY;
                    param.startX = pt.x;
                    param.startY = pt.y;
                    param.endX = param.startX + param.width;
                    param.endY = param.startY + param.height;
                    param.left = param.startX;
                    param.top = param.startY;
                    param.right = param.endX;
                    param.bottom = param.endY;
                }
            }
        }
        if (!param) param = key1.param;

        //param.left=param.startX;
        //param.top=param.startY;
        //param.right=param.left+param.width;
        //param.bottom=param.top+param.height;

        return param;
    },
    getTweenFactors: function (count, type) {

        // count 代表系数的数目，由帧数决定。每一帧对应一个系数

        // factors 是返回的系数的数组，取值由插值算法决定，一般在0~1，但也有可能比0小，比1大（例如振荡模型）
        var factors = [];

        // 初始位置，对应timelineUnit的第一帧(frameStart)
        var position = { x: 0 };

        // 生成tween对象
        var tween = new TWEEN.Tween(position);

        // 终止位置，对应timelineUnit的最后一帧
        tween.to({ x: 1 }, 1000);

        // 注册算法类型
        // type需要在属性对话框中用droplist指定。当检测到当前层、当前unit包含动画时显示该属性参数。     
        // Linear.EaseNone (Linear)
        // 
        // Quartic.EaseIn (Fade In)
        // Quartic.EaseOut (Fade Out)
        // Quartic.EaseInOut (Fade In & Out)
        // 
        // Elastic.EaseIn (Elastic In)
        // Elastic.EaseOut (Elastic Out)
        // Elastic.EaseInOut (Elastic In & Out)
        // 
        // Bounce.EaseIn (Bounce In)
        // Bounce.EaseOut (Bounce Out)
        // Bounce.EaseInOut (Bounce In & Out)
        if (!type) type = 'Linear.EaseNone';//默认线性运动
        //tween.easing(eval('TWEEN.Easing.' + type));
        type = type.split('.');
        var tl = type.length
        var typeFun = TWEEN.Easing;
        while (tl) {
            typeFun = typeFun[type[type.length - tl]];
            tl--;
        }
        tween.easing(typeFun);


        // 获取每一帧对应的系数
        for (var i = 0; i < count; i++)
            factors[i] = tween.getFactor(i / count);

        // 返回系数
        return factors;
    }
}

/**
Tween Lib
* @author sole / http://soledadpenades.com
* @author mr.doob / http://mrdoob.com
* @author Robert Eisele / http://www.xarg.org
* @author Philippe / http://philippe.elsass.me
* @author Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
*/
var TWEEN = TWEEN || (function () {
    var i, tl, interval, time, tweens = [];
    return {
        start: function (fps) {
            interval = setInterval(this.update, 1000 / (fps || 60));
        },
        stop: function () {
            clearInterval(interval);
        },
        add: function (tween) {
            tweens.push(tween);
        },
        getAll: function () {
            return tweens;
        },
        removeAll: function () {
            tweens = [];
        },
        remove: function (tween) {
            i = tweens.indexOf(tween);
            if (i !== -1) {
                tweens.splice(i, 1);
            }
        },
        update: function () {
            i = 0; tl = tweens.length;
            time = new Date().getTime();
            while (i < tl) {
                if (tweens[i].update(time)) {
                    i++;
                } else {
                    tweens.splice(i, 1);
                    tl--;
                }
            }
        }
    };
})();
TWEEN.Tween = function (object) {
    var _object = object,
    _valuesStart = {},
    _valuesDelta = {},
    _valuesEnd = {},
    _duration = 1000,
    _delayTime = 0,
    _startTime = null,
    _easingFunction = TWEEN.Easing.Linear.EaseNone,
    _chainedTween = null,
    _onUpdateCallback = null,
    _onCompleteCallback = null,
    that = this;
    that.to = function (properties, duration) {
        if (duration !== null) {
            _duration = duration;
        }
        for (var property in properties) {
            // This prevents the engine from interpolating null values
            if (_object[property] === null) {
                continue;
            }
            // The current values are read when the tween starts;
            // here we only store the final desired values
            _valuesEnd[property] = properties[property];
        }
        return this;
    };
    that.start = function () {
        TWEEN.add(this);
        _startTime = new Date().getTime() + _delayTime;
        for (var property in _valuesEnd) {
            // Again, prevent dealing with null values
            if (_object[property] === null) {
                continue;
            }
            _valuesStart[property] = _object[property];
            _valuesDelta[property] = _valuesEnd[property] - _object[property];
        }
        return this;
    };
    that.stop = function () {
        TWEEN.remove(this);
        return this;
    };
    that.delay = function (amount) {
        _delayTime = amount;
        return this;
    };
    that.easing = function (easing) {
        _easingFunction = easing;
        return this;
    };
    that.chain = function (chainedTween) {
        _chainedTween = chainedTween;
    };
    that.onUpdate = function (onUpdateCallback) {
        _onUpdateCallback = onUpdateCallback;
        return this;
    };
    that.onComplete = function (onCompleteCallback) {
        _onCompleteCallback = onCompleteCallback;
        return this;
    };
    that.getFactor = function (ratio) {
        var property, elapsed, value;
        elapsed = Math.min(1., Math.max(0., ratio));
        value = _easingFunction(elapsed);
        return value;
    };
    that.update = function (time) {
        var property, elapsed, value;
        if (time < _startTime) {
            return true;
        }
        elapsed = (time - _startTime) / _duration;
        elapsed = elapsed > 1 ? 1 : elapsed;
        value = _easingFunction(elapsed);
        for (property in _valuesDelta) {
            _object[property] = _valuesStart[property] + _valuesDelta[property] * value;
        }
        if (_onUpdateCallback !== null) {
            _onUpdateCallback.call(_object, value);
        }
        if (elapsed == 1) {
            if (_onCompleteCallback !== null) {
                _onCompleteCallback.call(_object);
            }
            if (_chainedTween !== null) {
                _chainedTween.start();
            }
            return false;
        }
        return true;
    };
    /*
    this.destroy = function () {
        TWEEN.remove( this );
    };
    */
}
TWEEN.Easing = { Linear: {}, Quadratic: {}, Cubic: {}, Quartic: {}, Quintic: {}, Sinusoidal: {}, Exponential: {}, Circular: {}, Elastic: {}, Back: {}, Bounce: {}, Step: {} };
TWEEN.Easing.Linear.EaseNone = function (k) {
    return k;
};
//
TWEEN.Easing.Quadratic.EaseIn = function (k) {
    return k * k;
};
TWEEN.Easing.Quadratic.EaseOut = function (k) {
    return -k * (k - 2);
};
TWEEN.Easing.Quadratic.EaseInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k;
    return -0.5 * (--k * (k - 2) - 1);
};
//
TWEEN.Easing.Cubic.EaseIn = function (k) {
    return k * k * k;
};
TWEEN.Easing.Cubic.EaseOut = function (k) {
    return --k * k * k + 1;
};
TWEEN.Easing.Cubic.EaseInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k;
    return 0.5 * ((k -= 2) * k * k + 2);
};
//
TWEEN.Easing.Quartic.EaseIn = function (k) {
    return k * k * k * k;
};
TWEEN.Easing.Quartic.EaseOut = function (k) {
    return -(--k * k * k * k - 1);
}
TWEEN.Easing.Quartic.EaseInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k * k;
    return -0.5 * ((k -= 2) * k * k * k - 2);
};
//
TWEEN.Easing.Quintic.EaseIn = function (k) {
    return k * k * k * k * k;
};
TWEEN.Easing.Quintic.EaseOut = function (k) {
    return (k = k - 1) * k * k * k * k + 1;
};
TWEEN.Easing.Quintic.EaseInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
};
// 
TWEEN.Easing.Sinusoidal.EaseIn = function (k) {
    return -Math.cos(k * Math.PI / 2) + 1;
};
TWEEN.Easing.Sinusoidal.EaseOut = function (k) {
    return Math.sin(k * Math.PI / 2);
};
TWEEN.Easing.Sinusoidal.EaseInOut = function (k) {
    return -0.5 * (Math.cos(Math.PI * k) - 1);
};
//
TWEEN.Easing.Exponential.EaseIn = function (k) {
    return k == 0 ? 0 : Math.pow(2, 10 * (k - 1));
};
TWEEN.Easing.Exponential.EaseOut = function (k) {
    return k == 1 ? 1 : -Math.pow(2, -10 * k) + 1;
};
TWEEN.Easing.Exponential.EaseInOut = function (k) {
    if (k == 0) return 0;
    if (k == 1) return 1;
    if ((k *= 2) < 1) return 0.5 * Math.pow(2, 10 * (k - 1));
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
};
// 
TWEEN.Easing.Circular.EaseIn = function (k) {
    return -(Math.sqrt(1 - k * k) - 1);
};
TWEEN.Easing.Circular.EaseOut = function (k) {
    return Math.sqrt(1 - --k * k);
};
TWEEN.Easing.Circular.EaseInOut = function (k) {
    if ((k /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
};
//
TWEEN.Easing.Elastic.EaseIn = function (k) {
    var s, a = 0.1, p = 0.25;
    if (k == 0) return 0; if (k == 1) return 1; if (!p) p = 0.3;
    if (!a || a < 1) { a = 1; s = p / 4; }
    else s = p / (2 * Math.PI) * Math.asin(1 / a);
    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
};
TWEEN.Easing.Elastic.EaseOut = function (k) {
    var s, a = 0.1, p = 0.25;
    if (k == 0) return 0; if (k == 1) return 1; if (!p) p = 0.3;
    if (!a || a < 1) { a = 1; s = p / 4; }
    else s = p / (2 * Math.PI) * Math.asin(1 / a);
    return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
};
TWEEN.Easing.Elastic.EaseInOut = function (k) {
    var s, a = 0.1, p = 0.25;
    if (k == 0) return 0; if (k == 1) return 1; if (!p) p = 0.3;
    if (!a || a < 1) { a = 1; s = p / 4; }
    else s = p / (2 * Math.PI) * Math.asin(1 / a);
    if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
};
//
TWEEN.Easing.Back.EaseIn = function (k) {
    var s = 1.70158;
    return k * k * ((s + 1) * k - s);
};
TWEEN.Easing.Back.EaseOut = function (k) {
    var s = 1.70158;
    return (k = k - 1) * k * ((s + 1) * k + s) + 1;
};
TWEEN.Easing.Back.EaseInOut = function (k) {
    var s = 1.70158 * 1.525;
    if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
};
// 
TWEEN.Easing.Bounce.EaseIn = function (k) {
    return 1 - TWEEN.Easing.Bounce.EaseOut(1 - k);
};
TWEEN.Easing.Bounce.EaseOut = function (k) {
    if ((k /= 1) < (1 / 2.75)) {
        return 7.5625 * k * k;
    } else if (k < (2 / 2.75)) {
        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    } else if (k < (2.5 / 2.75)) {
        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
    } else {
        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
    }
};
TWEEN.Easing.Bounce.EaseInOut = function (k) {
    if (k < 0.5) return TWEEN.Easing.Bounce.EaseIn(k * 2) * 0.5;
    return TWEEN.Easing.Bounce.EaseOut(k * 2 - 1) * 0.5 + 0.5;
};

TWEEN.Easing.Step.EaseIn = function (k) {
    return 0;
};

Param = {
    exchange: function (p1, p2, assign) {
        // TODO: Is there a better way? 
        var src;
        var des;
        if (assign) {
            src = p1;
            des = p2;
        }
        else {
            src = p2;
            des = p1;
        }

        des.startX = src.startX;
        des.startY = src.startY;
        des.endX = src.endX;
        des.endY = src.endY;

        des.left = src.left;
        des.right = src.right;
        des.top = src.top;
        des.bottom = src.bottom;

        des.width = src.width;
        des.height = src.height;

        des.alpha = src.alpha;
        des.scaleX = src.scaleX;
        des.scaleY = src.scaleY;
        des.rotate = src.rotate;

        des.rotateCenterX = src.rotateCenterX;
        des.rotateCenterY = src.rotateCenterY;
        des.customPivot = src.customPivot;
    },
    tweenParam: function (des, param1, param2, factor) {
        des.startX = param1.startX + factor * (param2.startX - param1.startX);
        des.startY = param1.startY + factor * (param2.startY - param1.startY);
        des.endX = param1.endX + factor * (param2.endX - param1.endX);
        des.endY = param1.endY + factor * (param2.endY - param1.endY);
        des.width = param1.width + factor * (param2.width - param1.width);
        des.height = param1.height + factor * (param2.height - param1.height);
        des.alpha = param1.alpha + factor * (param2.alpha - param1.alpha);
        des.scaleX = param1.scaleX + factor * (param2.scaleX - param1.scaleX);
        des.scaleY = param1.scaleY + factor * (param2.scaleY - param1.scaleY);
        des.rotate = param1.rotate + factor * (param2.rotate - param1.rotate);
        des.rotateCenterX = param1.rotateCenterX + factor * (param2.rotateCenterX - param1.rotateCenterX);
        des.rotateCenterY = param1.rotateCenterY + factor * (param2.rotateCenterY - param1.rotateCenterY);
        des.customPivot = true;

        if (param1.fillInfo && param1.fillInfo && (param1.fillInfo.fillStyle == 1 || param1.fillInfo.fillStyle == 2)) {
            des.fillInfo.fillStartPos.x = param1.fillInfo.fillStartPos.x + factor *
                (param2.fillInfo.fillStartPos.x - param1.fillInfo.fillStartPos.x);
            des.fillInfo.fillStartPos.y = param1.fillInfo.fillStartPos.y + factor *
                (param2.fillInfo.fillStartPos.y - param1.fillInfo.fillStartPos.y);

            des.fillInfo.fillEndPos.x = param1.fillInfo.fillEndPos.x + factor *
                (param2.fillInfo.fillEndPos.x - param1.fillInfo.fillEndPos.x);
            des.fillInfo.fillEndPos.y = param1.fillInfo.fillEndPos.y + factor *
                (param2.fillInfo.fillEndPos.y - param1.fillInfo.fillEndPos.y);
        }

        des.left = des.startX;
        des.top = des.startY;
        des.right = des.startX + des.width;
        des.bottom = des.startY + des.height;
    }
}
Hanimation = {};
Hanimation.PATHMODE_DEFAULT = 0;

(function () {
    Mugeda.initCss3Player = function () {

        document.addEventListener("mousedown", MugedaCss3.handleCapture, true);
        document.addEventListener("mouseup", MugedaCss3.handleCapture, true);
        document.addEventListener("mouseover", MugedaCss3.handleCapture, true);
        document.addEventListener("mouseout", MugedaCss3.handleCapture, true);
        document.addEventListener("mousemove", MugedaCss3.handleCapture, true);

        Mugeda.loadJs = function (src, callback, error) {
            if (isLoaded(src)) {
                if (callback) callback();
                return;
            }
            var objDynamic = document.createElement("script");
            objDynamic.src = src;
            document.getElementsByTagName("head")[0].appendChild(objDynamic);
            objDynamic.onload = objDynamic.onreadystatechange = function () {
                if (this.readyState && this.readyState == "loading")
                    return;
                else
                    if (callback) {
                        callback();
                        callback = function () { };
                    };
            }
            objDynamic.onerror = function (event) {
                objDynamic.parentNode.removeChild(objDynamic);
                error();
            }
        }

        var isLoaded = function (src) {
            var scripts = document.getElementsByTagName("script");
            var isLoaded = false;
            for (i = 0; i < scripts.length; i++) {
                if (scripts[i].src && scripts[i].src.indexOf(src) != -1) {
                    if (scripts[i].readyState == "loaded" || scripts[i].readyState == "complete") {
                        isLoaded = true;
                        break;
                    }
                }
            }
            return isLoaded;
        }

        Mugeda.startAnimation = function (tag, scriptName, stageDom, resDir, name) {
            var ua = navigator.userAgent.toLowerCase();
            Mugeda.isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
            Mugeda.androidVersion = parseFloat(ua.slice(ua.indexOf('android') + 8));

            var m = MugedaCss3.initAnimation(Mugeda.data[tag], scriptName, stageDom, resDir, function () {
                if (name) MugedaCss3.stage[name] = m;

            });
           
            Mugeda.scene = m;
            if (Mugeda.customScript && Mugeda.customScript.length)
                eval(Mugeda.customScript);
        }

        if (Mugeda.css3PlayerLoaded == undefined) { // 如果没有定义，说明不是嵌入动画
            var stageDoms = document.getElementsByClassName("MugedaStage");
            var stageNum = stageDoms.length;
            for (var i = 0; i < stageNum; i++) {
                var stageDom = stageDoms[i],
                    dataName = stageDom.getAttribute("mugedaName");

                var m = MugedaCss3.initAnimation(Mugeda.data[dataName], (stageDom.m_attr("hasScript") == "true" ? "actions_" + (dataName.substr(dataName.indexOf("_") + 1) + ".js") : ""), stageDom, (stageDom.m_attr("relDir") || ""), function () {
                    MugedaCss3.stage[dataName] = m;
                    if (--stageNum == 0 && typeof Mugeda.script == "function")
                        Mugeda.script();
                });

                Mugeda.scene = m;
                if (Mugeda.customScript && Mugeda.customScript.length)
                    eval(Mugeda.customScript);
            }
            return;
        }

        Mugeda.css3PlayerLoaded = 2; // 设定标志位为2,意味着dom和player都已经准备好了

        // 加载列表中没有加载过的动画
        if (Mugeda.creationToBeLoad) {
            for (var i = 0; i < Mugeda.creationToBeLoad.length; i++) {
                Mugeda.creationToBeLoad[i].start();
            }
            Mugeda.creationToBeLoad = [];
        }
    }
})();

if (document && document.getElementsByTagName && document.getElementById && document.body) { //判断dom是否已经加载完成
    Mugeda.initCss3Player();
}
else {
    document.addEventListener("DOMContentLoaded", Mugeda.initCss3Player);
}
