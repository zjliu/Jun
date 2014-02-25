var MugedaCardSignature=(function(){
	var Signature=function(option){
		for(var key in option){
			this[key]=option[key];
		}
		this.data=[];
	}
	Signature.prototype={
		init:function(){
		   var self=this;
		   this.canvas = document.createElement("canvas");
		   this.canvas.width = getStyle(this.parent,"width",true);
		   this.canvas.height = getStyle(this.parent,"height",true);
		   this.parent.innerHTML="";
		   this.parent.appendChild(this.canvas);
		   this.context = this.canvas.getContext("2d");

			E(function(e){
				e.stopPropagation();
				e.preventDefault();
				return false;
			},"touchstart",document);

			E(function(e){
				var pencil = new Pencil();
				self.pencil = pencil;
				pencil.curve.points=[];
				pencil.lastPoint=null;
				var position = getPointOnCanvas(self.canvas,e);	
				pencil.setStartPoint(position.x,position.y);
				pencil.setEndPoint(position.x,position.y);
			},isM?"touchstart":"mousedown",self.canvas);

			E(function(e){
				if(!self.pencil) return;
				var position = getPointOnCanvas(self.canvas,e);	
				self.pencil.setEndPoint(position.x,position.y,0);
				self.clear();
				self.draw();
			},isM?"touchmove":"mousemove",self.canvas);

			E(function(e){
				self.data.push(self.pencil);
				self.pencil=null;
			},isM?"touchend":"mouseup",self.canvas);
		},
		clear:function(){
			this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		},
		create:function(){
		},
		render:function(data){

		},
		deal:function(){

		},
		draw:function(){
			for(var i=0,l=this.data.length;i<l;i++){
				var pencil = this.data[i];
				pencil.draw(this.context);
			}
			if(this.pencil){
				this.pencil.draw(this.context);
			}
		}
	}

var isM = isMobile();

function getStyle(element,style,needInt){
	var value = getComputedStyle(element)[style];
	return needInt?parseInt(value):value;
}

function E(f, e, o) {
    if (!e) e = 'load';
    if (!o) o = window;
    if(o.attachEvent) {
        o.attachEvent('on' + e, f)
    } else {
        o.addEventListener(e, f, false)
    }
}

function getPointOnCanvas (canvas, e) {
   var bbox = canvas.getBoundingClientRect();
   var x = 0, y = 0;
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

function isMobile(){
    var isMobile = navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i);
        
    return isMobile ? true : false;
}

var createTriPoint = function(x0, y0, x1, y1, x2, y2) {
    var triPoint = {
        nodeX: x0 ? x0: 0,
        nodeY: y0 ? y0: 0,
        forwardX: x1 ? x1: 0,
        forwardY: y1 ? y1: 0,
        backwardX: x2 ? x2: 0,
        backwardY: y2 ? y2: 0
    };

    return triPoint;
};

/*********************************************************************
 * Pencil 
 *********************************************************************/
var Pencil = function(data) {
	var defaultData={
		'lastPoint':null,
		'curve':{
			'points':[],
			'smooth':3
		},
		'drawInfo':{
			lineWidth:4,
			sX:1,
			sY:1,
			lineCap:'round',
			lineJoin:'round',
			globalAlpha:1,
			strokeStyle:'#E00039'
		}
	}
	this.data=extend({},defaultData,data);
	for(var key in this.data){
		this[key]=this.data[key];
	}
}

Pencil.prototype = {
	setStyle:function(ctx){
		var drawInfo = this.drawInfo;
		var sX = drawInfo.sX;
		var sY = drawInfo.sY;
		ctx.lineWidth = drawInfo.lineWidth;
		ctx.lineCap = drawInfo.lineCap;
		ctx.lineJoin = drawInfo.lineJoin;
		ctx.globalAlpha = drawInfo.globalAlpha;
		ctx.strokeStyle = drawInfo.strokeStyle;
	},
	addPoint:function(e,t){
		if (!this.lastPoint)
			return;
		var n = this.curve.points;
		var r = .2;
		var i = r * (e - this.lastPoint.x);
		var s = r * (t - this.lastPoint.y);
		var o = createTriPoint((e + this.lastPoint.x) / 2, (t + this.lastPoint.y) / 2, e - i, t - s, this.lastPoint.x + i, this.lastPoint.y + s);
		n.push(o)
	},
	updatePoints:function(e,t,n,r,i){
		function s(e, t, n, r) {
			return Math.sqrt(Math.pow(e - n, 2) + Math.pow(t - r, 2))
		}
		var o = Math.pow(2, this.curve.smooth);
		if (this.lastPoint) {
			if (s(this.lastPoint.x, this.lastPoint.y, n, r) > o) {
				this.addPoint(n, r);
				this.lastPoint.x = n;
				this.lastPoint.y = r
			}
		} else {
			this.lastPoint = {};
			this.lastPoint.x = e;
			this.lastPoint.y = t
		}
	},
	setStartPoint:function(e,t,n){
		this.editStartX = e;
		this.editStartY = t;
	},
	setEndPoint:function(e,t,n){
		this.editEndX = e;
		this.editEndY = t
		this.updatePoints(this.editStartX, this.editStartY, this.editEndX, this.editEndY, n)
	},
	draw:function(ctx){
		ctx.save();
		ctx.beginPath();
		this.setStyle(ctx);
		var sX = this.drawInfo.sX;
		var sY = this.drawInfo.sY;
		for(var i=0,points = this.curve.points,drawLen=points.length;i<drawLen-1;i++)
		{
			point1 = points[i];
			ctx.arc(point1.nodex,point1.nodeY,5,0,Math.PI*2);
			point2 = points[i+1];
			if(i == 0)
				ctx.moveTo(point1.nodeX*sX, point1.nodeY*sY); 	
			ctx.bezierCurveTo(point1.forwardX*sX, point1.forwardY*sY, point2.backwardX*sX, point2.backwardY*sY, point2.nodeX*sX, point2.nodeY*sY);
		}
		ctx.stroke();
		ctx.restore();
	},
}

	return Signature;
})();


function extend() {
    function isPlainObject(obj) {
	 var class2type = {},
	     core_toString = class2type.toString,
         core_hasOwn = class2type.hasOwnProperty;
         function type(obj) {
           if (obj == null) {
               return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function" ?
						 class2type[core_toString.call(obj)] || "object" :
						 typeof obj;
		  }
          function isWindow(obj) {
               return obj != null && obj === obj.window;
          }
          if (type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
              return false;
          }
          try {
             if (obj.constructor &&
              !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
               return false;
           }
           } catch (e) {
              return false;
           }
		return true;
     }

     var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !this.isFunction(target)) {
           target = {};
        }
        if (length === i) {
           target = this;
           --i;
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
                       clone = src && this.isArray(src) ? src : [];
                    } else {
						clone = src && isPlainObject(src) ? src : {};
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
