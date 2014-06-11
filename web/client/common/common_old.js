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

function eRandom(m,n,isInt){
	var max = Math.max(m,n);
	var min = Math.min(m,n);
	var result = min + (max-min)*Math.random();
	return isInt ? Math.round(result) : result;
}

function randomColor(){
	return "rgba(" + [eRandom(0,255,true),eRandom(0,255,true),eRandom(0,255,true),Math.random().toFixed(2)] +")"
}

function randomAngle(){
	return eRandom(-Math.PI,Math.PI);
}

function randomStar(boundaryX,boundaryY,minRadius,maxRadius,speed){
	this.r = eRandom(minRadius,maxRadius,true);
	this.x = eRandom(this.r,boundaryX,true);
	this.y = eRandom(this.r,boundaryY,true);
	this.color = randomColor();
	this.angle = randomAngle();
	this.speed = speed || 0.05;
	this.draw = function(context){
		context.save();
		context.fillStyle = this.color;
		var angle = Math.PI*2/5;
		context.beginPath();
		var point0 = getPointPosition(this.angle,this);
		context.moveTo(point0.x,point0.y);
		var indexArray = [0,2,4,1,3];
		for(var i=1,l=indexArray.length;i<l;i++){
			var position = getPointPosition(this.angle+angle*indexArray[i],this);
			context.lineTo(position.x,position.y);
		}
		context.moveTo(point0.x,point0.y);
		context.closePath();
		context.fill();
		context.restore();
		return this;
	}
	this.changeColor=function(){
		var array = this.color.split(',');
		var A = parseFloat(array[3]);
		this.colorDir = this.colorDir || 1;	
		A=A>1?1.00:A;
		A=A<0?0.00:A;
		if(this.colorDir === 1){
			if(A===1.00){
				this.colorDir = -1;
			}
			else{
				A = A + this.speed;
			}
		}
		else{
			if(A===0.00){
				this.colorDir = 1;
			}
			else{
				A = A - this.speed;
			}
		}
		array[3] = A.toFixed(2)+")";
		this.color = array.toString();
	}

	this.move = function(speed){
		if(this.y>boundaryY){
			this.y = 0;
		}
		else{
			this.y+=speed;
		}
	}

	function getPointPosition(angle,star){
		return {"x":star.x+Math.cos(angle)*star.r,"y":star.y+Math.sin(angle)*star.r};
	}
}
window.requestNextAnimationFrame =
	(function () {
		var originalWebkitRequestAnimationFrame = undefined,
		wrapper = undefined,
		callback = undefined,
		geckoVersion = 0,
		userAgent = navigator.userAgent,
		index = 0,
		self = this;
		// Workaround for Chrome 10 bug where Chrome
		// does not pass the time to the animation function
		if (window.webkitRequestAnimationFrame) {
			 // Define the wrapper
			 wrapper = function (time) {
				if (time === undefined) {
					time = +new Date();
				}
				self.callback(time);
			};

			// Make the switch
			originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;    
			window.webkitRequestAnimationFrame = function (callback, element) {
				self.callback = callback;
				// Browser calls the wrapper and wrapper calls the callback
				 originalWebkitRequestAnimationFrame(wrapper, element);
			}
		}

		// Workaround for Gecko 2.0, which has a bug in
		// mozRequestAnimationFrame() that restricts animations
		// to 30-40 fps.

		if (window.mozRequestAnimationFrame) {
			// Check the Gecko version. Gecko is used by browsers
			// other than Firefox. Gecko 2.0 corresponds to
			// Firefox 4.0.
			index = userAgent.indexOf('rv:');

			if (userAgent.indexOf('Gecko') != -1) {
				geckoVersion = userAgent.substr(index + 3, 3);
				if (geckoVersion === '2.0') {
					// Forces the return statement to fall through
					// to the setTimeout() function.
					window.mozRequestAnimationFrame = undefined;
				}
			}
		}

		return window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function (callback, element) {
				var start,
				finish;
				window.setTimeout( function () {
					start = +new Date();
					callback(start);
					finish = +new Date();
					self.timeout = 1000 / 60 - (finish - start);
			}, self.timeout);
		};
	})
();
