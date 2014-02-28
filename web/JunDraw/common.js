var isM = isMobile();
var START = isM?"touchstart":"mousedown";
var MOVE = isM?"touchmove":"mousemove";
var END = isM?"touchend":"mouseup";

function isMobile() {
	var isMobile = navigator.userAgent.match(/Android/i) 
		|| navigator.userAgent.match(/webOS/i) 
		|| navigator.userAgent.match(/iPhone/i) 
		|| navigator.userAgent.match(/iPad/i) 
		|| navigator.userAgent.match(/iPod/i) 
		|| navigator.userAgent.match(/BlackBerry/i) 
		|| navigator.userAgent.match(/Windows Phone/i);
	return isMobile ? true: false;
}

function type(obj) {
	var class2type = {},
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty;
	if (obj == null) {
		return String(obj);
	}
	return typeof obj === "object" || typeof obj === "function" ? class2type[core_toString.call(obj)] || "object": typeof obj;
}

function isWindow(obj) {
	return obj != null && obj === obj.window;
}

function isPlainObject(obj) {
	var class2type = {},
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty;
	if (type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
		return false;
	}
	try {
		if (obj.constructor && ! core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
			return false;
		}
	} catch(e) {
		return false;
	}
	return true;
}

function extend() {
	var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
	i = 1,
	length = arguments.length,
	deep = false;
	if (typeof target === "boolean") {
		deep = target;
		target = arguments[1] || {};
		i = 2;
	}
	if (typeof target !== "object" && ! this.isFunction(target)) {
		target = {};
	}
	if (length === i) {
		target = this; --i;
	}
	for (; i < length; i++) {
		if ((options = arguments[i]) != null) {
			for (name in options) {
				src = target[name];
				copy = options[name];
				if (target === copy) {
					continue;
				}
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && this.isArray(src) ? src: [];
					} else {
						clone = src && isPlainObject(src) ? src: {};
					}
					target[name] = this.extend(deep, clone, copy);
				}
				else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}
	return target;
}

function getStyle(element, style, needInt) {
	var value = getComputedStyle(element)[style];
	return needInt ? parseInt(value) : value;
}

function E(f, e, o) {
	if (!e) e = 'load';
	if (!o) o = window;
	if (o.attachEvent) {
		o.attachEvent('on' + e, f)
	} else {
		o.addEventListener(e, f, false)
	}
}

function getPointOnCanvas(canvas, e) {
	var bbox = canvas.getBoundingClientRect();
	var x = 0,
	y = 0;
	if (isM) {
		var touch = e.touches[0];
		x = touch.clientX;
		y = touch.clientY;
	}
	else {
		x = e.pageX;
		y = e.pageY;
	}
	return {
		x: x - bbox.left * (canvas.width / bbox.width),
		y: y - bbox.top * (canvas.height / bbox.height)
	};
}

