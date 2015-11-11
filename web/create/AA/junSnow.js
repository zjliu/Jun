var JunSnow=(function(){
	function eRandom(m,n,isInt){
		var max = Math.max(m,n);
		var min = Math.min(m,n);
		var result = min + (max-min)*Math.random();
		return isInt ? Math.round(result) : result;
	}
	function eRandomArr(arr){
		if(arr && arr.length){
			return arr[eRandom(0,arr.length-1,true)];
		}
	}
	function setCss3Style(dom,key,value,haspx){
		if(dom){
			value=haspx?(value+'px'):value;
			var arr=['webkit','moz',''];
			for(var i=0,l=arr.length;i<l;i++){
				dom.style[arr[i]+key]=value;
			}
		}
	}
	function setCss(dom,obj){
		if(dom && obj){
			for(var key in obj){
				dom.style[key]=obj[key];
			}
		}
	}
	function snow(r,left,top,speed,time){
		this.r=r || 5;			//半径
		this.left=left || 0;	//位置left
		this.top=top || 0;		//位置top
		this.speed=speed;
		this.time=time;
		this.create=function(){
			var dom=document.createElement('span');
			dom.className='snow';
			this.dom=dom;
			this.setDom();
			return dom;
		}
		this.update=function(r,left,top,speed,time){
			if(!this.dom) return;
			this.r=r;
			this.left=left;
			this.top=top;
			this.speed=speed;
			this.time=time;
			this.setDom();
		}
		this.setDom=function(){
			setCss(this.dom,{
				'width':this.r+'px',
				'height':this.r+'px',
				'top':this.top+'px',
				'left':this.left+'px'
			});
			setCss3Style(this.dom,'BorderRadius',this.r+'px');
			setCss3Style(this.dom,'AnimationDuration',this.time+'s');
		}
	}

	var options={
		maxCount:40,//最大雪花数
		parentEl:null //父元素
	};

	var Snow=function(opts){
		var option=this.options=options;
		for(var key in opts){
			option[key]=opts[key];
		}
		option.parentEl=option.parentEl || document.body;
		this.pW=option.parentEl.clientWidth;
		this.pH=option.parentEl.clientHeight;
		this.init();
		this.snows=[];
	}

	Snow.prototype={
		init:function(){
			this.run();
		},
		createSnowObj:function(){
			var rArr=[2,3,6];
			var timeArr=[1.5,2,3,5];
			var r= eRandomArr(rArr);
			var left = eRandom(0,this.pW-r);
			var time= eRandomArr(timeArr);
			return {'r':r,'left':left,'time':time};
		},
		create:function(){
			var obj=this.createSnowObj();
			var sobj=new snow(obj.r,obj.left,0,0,obj.time);
			var dom=sobj.create();
			this.snows.push(sobj);
			var option=this.options;
			option.parentEl.appendChild(dom);
			this.initEvent(sobj);
		},
		run:function(){
			var self=this;
			var t=setInterval(function(){
				if(self.snows.length<self.options.maxCount){
					self.create();
				}
				else{
					clearInterval(t);
				}
			},100);
		},
		initEvent:function(obj){
			if(!obj) return;
			var self=this;
			(function(obj,self){
				var el=obj.dom;
				el.addEventListener('webkitAnimationIteration',function(){
					var objx=self.createSnowObj();
					obj.update(objx.r,objx.left,0,0,objx.time);
				});
			})(obj,self);
		}
	};
	return Snow;
})();
