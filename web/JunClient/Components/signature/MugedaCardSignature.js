var MugedaCardSignature=(function(){
	var Signature=function(){
		this.defaultOption={
			parent:null,
			left:0,
			top:0,
			width:320,
			height:240,
			backgroundColor:'#fff',
			color:'rgb(224, 0, 57)',
			lineWidth:4,
			linecap:'round',
			linejoin:'round',
			smooth:3,
			globalAlpha:1,
			showTool:true,
			callback:function(data){}
		};
		this.data=[];
	}
	Signature.prototype={
		 create:function(option){
		   this.options = extend({},this.defaultOption,option);
		   var self=this;
		   var options = self.options;
		   var signDiv = document.createElement("div"); 
		   signDiv.setAttribute("class","signDiv");
		   signDiv.innerHTML=
							'<div class="signTool">'
							+'<input class="toolbtn signToolClear" type="button" value="clear" />'
							+'<style>.signDiv{position:relative;}.signTool{position:absolute;bottom:0px;width:130px;height:26px;right:5px;text-align:right;}'
							+'.signTool .signToolClear{margin-right:5px;width:55px;}'
							+'.signTool .signToolOk{margin-right:5px;width:55px;}'
							+'.signTool .toolbtn{border:0.5px solid rgba(0,0,0,.4);height:90%;line-height:26px;background-color:rgba(0,0,0,0.1)}'
							+'.signTool .toolbtn:hover{box-shadow:rgba(0,0,0,.4) 0 0 8px;-webkit-box-shadow:rgba(0,0,0,.4) 0 0 8px;}'
							+'</style>'
							+'<input class="toolbtn signToolOk" type="button" value="ok" />'
							+'</div>'
		   this.canvas = document.createElement("canvas");
		   this.canvas.style.position='relative';
		   this.canvas.style.backgroundColor=options.backgroundColor;
		   this.canvas.style.strokeStyle=options.color;
		   if(options.parent){
				var width = getStyle(options.parent,"width",true);
				var height = getStyle(options.parent,"height",true);
				this.canvas.width = width;
				this.canvas.height = height;
				signDiv.style.width = width +'px';
				signDiv.style.height = height + 'px';
				options.parent.innerHTML="";
				signDiv.insertBefore(this.canvas,signDiv.firstChild);
				options.parent.appendChild(signDiv);
		   }else{
			    var width = options.width;
				var height = options.height;
				this.canvas.width = width;
				this.canvas.height = height;
				signDiv.style.width = width +'px';
				signDiv.style.height = height + 'px';
			    signDiv.style.position='absolute';
				signDiv.style.top = options.top + 'px';
				signDiv.style.left = options.left + 'px';
				signDiv.insertBefore(this.canvas,signDiv.firstChild);
				document.body.appendChild(signDiv);
		   }
		   this.dealSignDiv(signDiv);
		   this.context = this.canvas.getContext("2d");
			self.setStyle();
			E(function(e){
				e.stopPropagation();
				e.preventDefault();
				if(!options.showTool) return false;	
				var pencil = new Pencil();
				pencil.curve.smooth=self.options.smooth;
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
		render:function(data,option){
			if(this.canvas){
				var signDiv = this.canvas.parentNode;
				if(signDiv){
					signDiv.parentNode.removeChild(signDiv);
				}
			}
			this.create(option);
			if(typeof data === "string"){
				data = JSON.parse(data);
			}
			var pencilData=[];
			for(var index in data){
				var item = data[index];
				pencilData.push(new Pencil(item));
			}
			this.data=pencilData;
			this.draw();
		},
		draw:function(){
			for(var i=0,l=this.data.length;i<l;i++){
				var pencil = this.data[i];
				pencil.draw(this.context);
			}
			if(this.pencil){
				this.pencil.draw(this.context);
			}
		},
		setStyle:function(){
			var ctx = this.context;
			var options = this.options;
			ctx.lineWidth = options.lineWidth;
			ctx.lineCap = options.lineCap;
			ctx.lineJoin = options.linejoin;
			ctx.globalAlpha = options.globalAlpha;
			ctx.strokeStyle = options.color;
		},
		dealSignDiv:function(el){
			var self = this;
			var canvas = el.firstChild;
			var toolDiv = el.lastChild;
			if(toolDiv){
				toolDiv.style.display=self.options.showTool?"block":"none";
				var clearBtn = toolDiv.firstChild;
				var okBtn = toolDiv.lastChild;
				E(function(){
					self.clearStart=true;
				},isM?"touchstart":"mousedown",clearBtn);
				E(function(){
					if(!self.clearStart) return false;
					self.clear();	
					self.data=[];
				},isM?"touchend":"mouseup",clearBtn);

				E(function(){
					self.okStart=true;
				},isM?"touchstart":"mousedown",okBtn);
				E(function(){
					if(!self.okStart) return false;
					self.options.callback(JSON.stringify(self.data));
				},isM?"touchend":"mouseup",okBtn);
			}
		},
		hide:function(){
			if(this.options.parent){
				this.options.parent.style.display="none";
			}else{
				this.canvas.parentNode.style.display="none";
			}
		},
		show:function(){
			if(this.options.parent){
				this.options.parent.style.display="block";
			}else{
				this.canvas.parentNode.style.display="block";
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

/*********************************************************************
 * Pencil 
 *********************************************************************/
var Pencil = function(data) {
	var defaultData={
		'lastPoint':null,
		'curve':{
			'points':[],
			'smooth':3
		}
	}
	this.data=extend({},defaultData,data);
	for(var key in this.data){
		this[key]=this.data[key];
	}
}

Pencil.prototype = {
	addPoint:function(e,t){
		if (!this.lastPoint)
			return;
		var n = this.curve.points;
		var r = .2;
		var i = r * (e - this.lastPoint.x);
		var s = r * (t - this.lastPoint.y);
		var o = this.createTriPoint((e + this.lastPoint.x) / 2, (t + this.lastPoint.y) / 2, e - i, t - s, this.lastPoint.x + i, this.lastPoint.y + s);
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
	createTriPoint:function(x0, y0, x1, y1, x2, y2) {
		var triPoint = {
			nodeX: x0 ? x0: 0,
			nodeY: y0 ? y0: 0,
			forwardX: x1 ? x1: 0,
			forwardY: y1 ? y1: 0,
			backwardX: x2 ? x2: 0,
			backwardY: y2 ? y2: 0
		};
		return triPoint;
	},
	draw:function(ctx){
		ctx.save();
		ctx.beginPath();
		for(var i=0,points = this.curve.points,drawLen=points.length;i<drawLen-1;i++)
		{
			point1 = points[i];
			ctx.arc(point1.nodex,point1.nodeY,5,0,Math.PI*2);
			point2 = points[i+1];
			if(i == 0)
				ctx.moveTo(point1.nodeX, point1.nodeY); 	
			ctx.bezierCurveTo(point1.forwardX, point1.forwardY, point2.backwardX, point2.backwardY, point2.nodeX, point2.nodeY);
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
