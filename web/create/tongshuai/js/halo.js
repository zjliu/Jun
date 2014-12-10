/*
	@author: leeenx
	@当前文件为Paipai Mobile Modules的必要代码
	@组件文件存放于modules文件中
	@使用组件前必须载入pm.js文件，否则可能会造必须方法丢失（有部分方法可以独立运行，如果touch_drag）
	@常用方法use用于加入插件，并回调
	@halo.use('msgbox'...,function(m){},false/true);
	@注意的是最后一个boolean表示强制等待组件加载完成，如果为false表示不等待，这个时候m会有一个onready方法，用于监听组件加载情况
	@halo.use('msgbox',function(m){m.onready(function(){.....});},false);与halo.use('msgbox',function(){...},true);等价。当然不写默认为true
*/
var halo=function(){
	var version='201407041353';//统一时间缀
	//事件统一
	var TOUCH='stop',BEFORE_TOUCH='',TOUCH_X=0,TOUCH_Y=0,OFFSET_X=0,OFFSET_Y=0,vector_x=0,vector_y=0,sense_x=5,sense_y=5/*手指灵敏度*/,min_vector=50/*手势成立最小位移*/,gesture_time=500/*200毫秒内手指完成手势*/,start_time=0,end_time=0,longpress_time=500;
	if('ontouchstart' in document){
		var touchstart='touchstart',touchend='touchend',touchmove='touchmove';
	}else{
		var touchstart='mousedown',touchend='mouseup',touchmove='mousemove';
	}
	document.body.addEventListener(touchstart,
		function(e){
			TOUCH='start',BEFORE_TOUCH='',OFFSET_X=0,OFFSET_Y=0,start_time=new Date().getTime();
			if('touchstart'==touchstart){
				var touchers=e.changedTouches||e.targetTouches,toucher=touchers[0];
				TOUCH_X=toucher.pageX,TOUCH_Y=toucher.pageY;
			}else{
				TOUCH_X=e.clientX,TOUCH_Y=e.clientY;
			}
		},true);
	document.body.addEventListener(touchmove,
		function(e){
			if('start'!=TOUCH&&'move'!=TOUCH)return ;
			var offset_x=0,offset_y=0;
			if('touchstart'==touchstart){
				var touchers=e.changedTouches||e.targetTouches,toucher=touchers[0];
				vector_x=toucher.pageX-TOUCH_X,vector_y=toucher.pageY-TOUCH_Y;
				offset_x=Math.abs(vector_x),offset_y=Math.abs(vector_y);
			}else{
				offset_x=Math.abs(e.clientX-TOUCH_X),offset_y=Math.abs(e.clientY-TOUCH_Y);
			}
			if(offset_x>sense_x||offset_y>sense_y){
				BEFORE_TOUCH=TOUCH,
				TOUCH='move';//手指移动在sense_x,sense_y内都不算move
			}
			OFFSET_X=offset_x,OFFSET_Y=offset_y;
			end_time=new Date().getTime();
		},true);
	document.body.addEventListener(touchend,function(e){BEFORE_TOUCH=TOUCH,TOUCH='stop';},true);
	document.body.addEventListener('touchcancel',function(e){BEFORE_TOUCH=TOUCH,TOUCH='stop';},true);
	var modules={length:0};//已经加载的普通组件
	var needWait=true,//强制加载完成组件后才可以执行use回调
		path='widget/'//默认加载路径
		;
	//创建modules的副本，便于复制
	var _fun=function(){},_fun_=function(){};
	_fun.prototype=modules,_fun_.prototype=new _fun();
	var _modules=new _fun_();
	//以下是私有方法
	var load_module=function(filename,cb){
		var script=document.createElement("script");
		script.onload=function(){
			if(typeof(cb)=='function')cb('success');
		}
		script.onerror=function(){
			//加载出错
			if(typeof(cb)=='function')cb('error');
		}
		script.onabort=function(){
			//加载被停止
			if(typeof(cb)=='function')cb('abort');
		}
		script.type='text/javascript',script.src=path+filename+'.js?v='+version;
		document.head.appendChild(script);
		//document.head.removeChild(script);//触发加载即可，节点立马删除
	}
	//以下是事件绑定与解绑
	var on=function(elem,event,cb,type){
		var pm_cb=evcb.set(elem,event,cb);
		event=_event(event);
		elem.addEventListener(event,pm_cb,type);
	},
	off=function(elem,event,cb,type){
		if(typeof(cb)=='undefined'){
			//如果没有回调传入表示将所有事件函数删除
			evcb.del(elem,event);
		}else{
			var pm_cb=evcb.get(elem,event,cb,'remove_cb');
			event=_event(event);
			elem.removeEventListener(event,pm_cb,type);
		}
	},_event=function(event){
		//统一事件
		if('touchstart'==event)event=touchstart;
		else if('touchmove'==event)event=touchmove;
		else if('touchend'==event)event=touchend;
		else if('hold'==event)event=touchstart;
		else if('forcerelease'==event)event='touchcancel';
		else event=touchend;
		return event;
	},evcb=function(){//事件管理数组
		var ev={},set=function(elem,event,cb){
			var tag=elem.getAttribute('haloEV');
			if(!tag){
				tag='pm_'+new Date().getTime(),elem.setAttribute('haloEV',tag);
			}
			ev[tag]=ev[tag]||{},ev[tag][event]=ev[tag][event]||{pm_cb:[],cb:[]},ev[tag][event].cb.push(cb);
			if(touchmove!=event&&'flick'!=event&&'hold'!=event&&'release'!=event&&'forcerelease'!=event&&event.indexOf('gesture')=="-1"){
				var pm_cb=cb;
			}else if(touchmove==event){//原生事件需要封装的只有touchmove
				var pm_cb=function(){
					if('move'==TOUCH){
						cb.apply(this,arguments);
					}
				};
			}else if('flick'==event){
				var pm_cb=function(){
					if('start'==BEFORE_TOUCH){
						cb.apply(this,arguments);
					}
				}
			}else if('gesture_left'==event){
				//手势向左
				var pm_cb=function(){
					if(OFFSET_X>=OFFSET_Y&&vector_x<=-1*min_vector&&(end_time-start_time<=gesture_time)){
						cb.apply(this,arguments);
					}
				}
			}else if('gesture_right'==event){
				//手势向右
				var pm_cb=function(){
					if(OFFSET_X>=OFFSET_Y&&vector_x>=min_vector&&(end_time-start_time<=gesture_time)){
						cb.apply(this,arguments);
					}
				}
			}else if('gesture_up'==event){
				//手势向上
				var pm_cb=function(){
					if(OFFSET_Y>=OFFSET_X&&vector_y<=-1*min_vector&&(end_time-start_time<=gesture_time)){
						cb.apply(this,arguments);
					}
				}
			}else if('gesture_down'==event){
				//手势向下
				var pm_cb=function(){
					if(OFFSET_Y>=OFFSET_X&&vector_y>=min_vector&&(end_time-start_time<=gesture_time)){
						cb.apply(this,arguments);
					}
				}
			}else if('release'==event||'forcerelease'==event){
				//touchmove后touchend/touchcancel
				var pm_cb=function(){
					if('move'==BEFORE_TOUCH){
						cb.apply(this,arguments);
					}
				}
			}else if('hold'==event){
				//长按
				var pm_cb=function(){
					var _this=this,_start_time=start_time;
					setTimeout(function(){
						if(_start_time==start_time&&'stop'!=TOUCH){
							cb.apply(_this,arguments);
						}
					},longpress_time)
				}
			}
			ev[tag][event].pm_cb.push(pm_cb);
			return pm_cb;
		},get=function(elem,event,cb,remove){
			var tag=elem.getAttribute('haloEV');
			if(!tag)return ;
			if(ev[tag]&&ev[tag][event]){
				for(var i=0,evs=ev[tag][event],len=evs.cb.length;i<len;++i){
					if(evs.cb[i]==cb){
						var ret=evs.pm_cb[i];
						if(remove){
							delete evs.cb[i],delete evs.pm_cb[i];
						}
						return ret;
					}
				}
				return cb;
			}
		},del=function(elem,event){
			var tag=elem.getAttribute('haloEV'),_event_=_event(event);
			if(!tag)return ;
			if(ev[tag]&&ev[tag][event]){
				for(var i=0,evs=ev[tag][event],len=evs.cb.length;i<len;++i){
					elem.removeEventListener(_event_,evs.pm_cb[i],false);
					elem.removeEventListener(_event_,evs.pm_cb[i],true);
				}
			}
		},_o={set:set,get:get,del:del};
		return _o;
	}();
	//css操作方法
	var webkit=function(){
		//浏览器特有css样式的
		var css3_div=document.createElement("div");
		css3_div.style.cssText='-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
		if(css3_div.style.webkitTransition){
			return '-webkit-';
		}else if(css3_div.style.mozTransition){
			return '-moz-';
		}else if(css3_div.style.oTransition){
			return '-o-';
		}else if(css3_div.style.msTransition){
			return '-ms-';
		}else{
			return '';
		}
	}();
	var STYLESHEET=function(){
		var styleSheet=function(){
			//创建一个styleSheet,避免跨域问题
			var head = document.getElementsByTagName("head")[0]; 
			var style = document.createElement("style"); 
			style.type="text/css"; 
			head.appendChild(style);
			return document.styleSheets[document.styleSheets.length-1];
		}();
		function addStyleSheet(cssText){/*动态添加css样式*/
			var oCss = styleSheet,cssRules=cssText.split('\r\n');
			var len=!!oCss.cssRules?oCss.cssRules.length:0;//不直接使用oCss.cssRules.length是因为跨域时返回null，所以用len避免错误
			for(var i=0;i<cssRules.length;++i){
				oCss.insertRule(cssRules[i],len++);
			};
			return len;
		}
		return {add:addStyleSheet};
	}();
	var addClass=function(elem,_class){
		var className=elem.className,classReg=new RegExp('(^'+_class+'\\s+)|(\\s+'+_class+'\\s+)|(\\s+'+_class+'$)|(^'+_class+'$)','g');
		if(!className)elem.className=_class;
		else if(classReg.test(className))return;
		else elem.className=className+' '+_class;
	}
	var removeClass=function(elem,_class){
		var className=elem.className,classReg=new RegExp('(^'+_class+'\\s+)|(\\s+'+_class+'\\s+)|(\\s+'+_class+'$)|(^'+_class+'$)','g');
		className=className.replace(classReg,function(k,$1,$2,$3,$4){if($2)return ' ';else return '';});
		elem.className=className;
	}
	var get_transform_value=function(transform,key,index){
		//transform即transform的所有属性,key键名，index_arr按数组索引取value
		key=key.replace(/\-/g,'\\-');
		var index_list=[0];
		if(arguments.length>2){
			for(var i=2;i<arguments.length;++i){
				index_list[i-2]=arguments[i];
			}
		}
		if('none'==transform||''==transform)return null;//没有值，直接中断
		var reg=new RegExp(key+'\\(([^\\)]+)\\)','ig'),key_value=transform.match(reg),value_list=[],ret=[];
		if(key_value&&key_value.length>0){
			key_value=key_value[0];
			value_list=key_value.replace(reg,'$1').split(',');
			for(var i=0;i<index_list.length;++i){
				ret.push(value_list[index_list[i]]);
			}
		}
		if(ret.length==1)ret=ret[0];
		else if(index)ret=ret[index];
		return ret;
	}
	modules.on=on,modules.off=off,modules.removeClass=removeClass,modules.addClass=addClass,modules.stylesheet=STYLESHEET.add,modules.get_transform_value=get_transform_value,modules.webkit=webkit;
	//以下是公用方法
	var config=function(o){
		//配置默认属性
		if(typeof(o.wait)!='undefined'){
			needWait=!!o.wait;
		}
		path=o.path||path;
	}
	var add=function(name,fun,isPublic){
		//组件添加
		if(modules[name]){
			throw('命名冲突！');
		}else{
			if(!isPublic){
				modules[name]=fun;++modules.length;
			}else{//公用组件应该存放于public中

			}
		}
	}
	var usePublic=function(){//载入公用方法 - 此方法只有强制加载后执行
		var arg=arguments,need_load_count=0,loaded_count=0,cb=function(){};
		for(var i=0,len=arg.length;i<len;++i){
			if(typeof(arg[i])=='string'){
				arg[i]='../public/'+arg[i];
			}
		}
		use.apply({isPublic:true},arg);
	}
	var use=function(){//载入用户自己组件方法
		var arg=arguments,need_load_count=0,loaded_count=0,cb=function(){},wait=needWait,isPublic=this.isPublic;
		for(var i=0,len=arg.length;i<len;++i){
			var name=arg[i];
			if(typeof(name)=='string'){
				++need_load_count;
				if(!!modules[name])++loaded_count;//已经加载成功
				else{//需要加载
					(function(name){
						load_module(name,function(ret){
							if('success'){//console.log(name)
								if(!isPublic){
									chkReg(name,function(){
										++loaded_count;//文件加载成功并且将方法注册到modules中去，表示真正完成
									});
								}else{//公共组件不需要chkReg
									++loaded_count;
								}
							}else{
								if(!isPublic){
									++loaded_count;//没有加载完成忽略
								}else{
									throw('public file load fail!');
								}
							}
						});
					}(name));
				}
			}else{
				break;//遇到不是string直接中断
			}
		}
		if(typeof(arg[i])=="function"){
			cb=arg[i];
			//在有回调的情况下判断需不需要强制加载完成执行
			if(typeof(arg[i+1])!='undefined')wait=!!arg[i+1];
		};
		if(!wait){
			//不需要等待组件加载，直接执行
			_modules.onready=function(cb){_modules.ready=typeof(cb)=='function'?cb:function(){}};
			cb(_modules);
		}
		//需要等待加载组件加载完成执行回调
		chkLoad();
		function chkLoad(){
			//检查加载情况
			if(loaded_count==need_load_count){
				//加载完成
				if(wait){
					cb(modules);
				}else{
					_modules.ready(modules);
				} 
			}else{
				setTimeout(chkLoad,500)
			}
		}
		//检查组件加载成功，并且成功注册成
		function chkReg(name,cb){
			if(modules[name]){
				if(typeof(cb)=='function')cb();
			}else{
				setTimeout(function(){chkReg(name,cb);},500)
			}
		}
	}





	

   

	Function.prototype.delegate = function(scope){
        var that = this;
        return function(){
            that.apply(scope, arguments);
        };
    };

	return {add:add,use:use,usePublic:usePublic,config:config,on:on,off:off,removeClass:removeClass,addClass:addClass,stylesheet:STYLESHEET.add,get_transform_value:get_transform_value};
}();



/*
	@author:leeenx
	@功能：邀请函式翻页
*/
halo.use(function(m){
	var addClass=m.addClass,removeClass=m.removeClass,webkit=m.webkit;
	//添加滚动效果
	m.stylesheet('.TOUCH_INVITE_KEEP{'+webkit+'transition:'+webkit+'transform .3s ease-in-out;}');//竖屏
	m.stylesheet('.TOUCH_INVITE_RESTORE{'+webkit+'transition:'+webkit+'transform .1s linear;}');//弹性
	//m.stylesheet('');//android - hack
	halo.add('pageinvite',function(){
		//邀请函只需要考虑y轴位置
		var y=0,start_y=0,ch=document.documentElement.clientHeight,min_offset_y=50,
		bind=function(elem,need_scale){
			need_scale=typeof(need_scale)=='undefined'?true:need_scale;//默认背景缩放
			var sections=elem.getElementsByClassName('page'),cur_page=0,previous=-1,next=1,lock=false,motion='none',_motion='none',p_sec=null,n_sec=sections[1],cur_sec=sections[0],sec;
			//motion手势方向，_motion上一次手势方向
			for(var i=0,len=sections.length;i<len;++i){
				sections[i].style.cssText='display:'+(0==i?'block':'none')+'; position:absolute; z-index:0; left:0; top:0;';
			}
			var _touchstart=function(e){
				if(lock)return ;
				e.preventDefault();
				var touchers=e.changedTouches||e.targetTouches;
				start_y=touchers[0].pageY;//手指初始位置
			}
			m.on(elem,'touchstart',_touchstart,false);
			var _touchmove=function(e){
				if(lock)return ;
				var touchers=e.targetTouches||e.changedTouches,cur_y=touchers[0].pageY,offset_y=cur_y-start_y;
				if(offset_y<0){
					//向上
					motion='up';
				}else if(offset_y>0){
					//向下
					motion='down';
				}else{
					//无方向
					motion='none';
				}
				drag(offset_y);
			};
			m.on(elem,'touchmove',_touchmove,false);
			var release=function(e){
				if(!sec){
					//到底或顶弹性效果
					addClass(cur_sec,'TOUCH_INVITE_RESTORE');
					cur_sec.style[webkit+'transform']='translate3d(0,0,0)';
					setTimeout(function(){
						removeClass(cur_sec,'TOUCH_INVITE_RESTORE');
						//motion='none',_motion='none';//使两次手势一致
					},100);
				}
				if(!sec||lock)return ;
				lock=true;//锁住
				var touchers=e.changedTouches||e.targetTouches,cur_y=touchers[0].pageY,offset_y=cur_y-start_y;
				if(Math.abs(offset_y)>=min_offset_y){
					move();
				}else if(offset_y!=0){
					addClass(sec,'TOUCH_INVITE_RESTORE');
					sec.style[webkit+'transform']='translate3d(0,'+(motion=='up'?ch:-1*ch)+'px,0)';
					cur_sec.style[webkit+'transform']='scale(1,1)';
					setTimeout(function(){
						removeClass(sec,'TOUCH_INVITE_RESTORE');
						sec.style.display='none';
						motion='none',_motion='none';//使两次手势一致
						lock=false;//解锁
					},100);
				}
			};
			m.on(elem,'release',release,false),m.on(elem,'forcerelease',release,false);
			var fix_page=function(num){
				//使页码正确
				//if(num==len)return num;//临界值
				if(num>=0){
					return num%len;
				}else{
					return (len+num%len);
				}
			}
			var drag=function(){
				return function(offset_y){
					if(_motion!=motion){
						//变向
						if('up'==motion){
							!p_sec||(p_sec.style.display='none');
							!n_sec||(n_sec.style.cssText=webkit+'transform:translate3d(0,'+ch+'px,0);z-index:1;display:block; position:absolute;')
							sec=n_sec;
						}else if('down'==motion){
							!n_sec||(n_sec.style.display='none');
							!p_sec||(p_sec.style.cssText=webkit+'transform:translate3d(0,-'+ch+'px,0); z-index:1; display:block; position:absolute;')
							sec=p_sec;
						}else{
							if('up'==_motion){
								!n_sec||(n_sec.style.display='none');
							}else if('down'==motion){
								!p_sec||(p_sec.style.display='none');
							}
						}
						_motion=motion;
					}
					var _ch='up'==motion?ch:-ch;//console.log(sec)
					sec?(sec.style[webkit+'transform']='translate3d(0,'+(_ch+offset_y)+'px,0)'):(cur_sec.style[webkit+'transform']='translate3d(0,'+offset_y+'px,0)');
					if(need_scale&&sec){
						'up'==motion?(cur_sec.style[webkit+'transform-origin']='top'):(cur_sec.style[webkit+'transform-origin']='bottom');
						var _scale=1-.2*Math.abs(offset_y)/ch;
						cur_sec.style[webkit+'transform']='scale('+_scale+','+_scale+')';
					}
				}
			}();
			var move=function(cur){
				addClass(sec,'TOUCH_INVITE_KEEP');
				sec.style[webkit+'transform']='translate3d(0,0,0)';
				if(need_scale){
					addClass(cur_sec,'TOUCH_INVITE_KEEP');
					cur_sec.style[webkit+'transform']='scale(.8,.8)';
				}
				setTimeout(function(){
					removeClass(sec,'TOUCH_INVITE_KEEP'),cur_sec.style.display='none';
					if(need_scale){
						removeClass(cur_sec,'TOUCH_INVITE_KEEP');
					}
					//p_sec,n_sec,sec三者指向改变
					if(typeof(o.page_change)=='function'){
						o.page_change(cur_page,('up'==motion?next:previous));
					}
					if('up'==motion){
						typeof(cur)=='undefined'?++cur_page:cur_page=cur;
					}else{
						typeof(cur)=='undefined'?--cur_page:cur_page=cur;
					}
					next=cur_page+1,previous=cur_page-1;
					if(typeof(o.infinite)=='undefined'||(typeof(o.infinite)!='undefined'&&o.infinite)){
						//默认是无限循环模式
						cur_page=fix_page(cur_page),next=fix_page(next),previous=fix_page(previous);
					};
					cur_sec=sections[cur_page],n_sec=sections[next],p_sec=sections[previous];
					cur_sec.style.cssText='z-index:0;position:absolute; left:0; top:0;'/*,!p_sec||(p_sec.style.cssText='display:none'),!n_sec||(n_sec.style.cssText='display:none')*/;
					sec='up'==motion?n_sec:p_sec;
					motion='none',_motion='none';//使两次手势一致
					lock=false;//解锁
				},300);
			}
			var moveto=function(index){//页面滑动至指定页面
				index=parseInt(index)||0;
				if(index>=0&&index<len&&index!=cur_page){
					sec=sections[index];
					if(cur_page>index){
						motion='down';
						sec.style.cssText=webkit+'transform:translate3d(0,-'+ch+'px,0);z-index:1;display:block; position:absolute;'
					}else{
						motion='up';
						sec.style.cssText=webkit+'transform:translate3d(0,'+ch+'px,0);z-index:1;display:block; position:absolute;'
					}
					'up'==motion?(cur_sec.style[webkit+'transform-origin']='top'):(cur_sec.style[webkit+'transform-origin']='bottom');
					setTimeout(function(){move(index)},0);//chrome 滑动hack
				}
			}
			var unbind=function(){
				m.off(elem,'touchstart',_touchstart),m.off(elem,'touchmove',_touchmove),m.off(elem,'release',release,false),m.off(elem,'forcerelease',release,false);
			}
			//监听a元素
			m.on(elem,'flick',function(e){
				if(e.target.tagName=='A'){
					window.location.href=e.target.href;
				}
			});
			var o={move:moveto,unbind:unbind};
			return o;
		}
		window.addEventListener('resize',function(){
			ch=document.documentElement.clientHeight;
		})
		return {bind:bind}
	}())
});

(function(exports){
        var images = {};

        var Loader = function(source){
            this._source = [];
            this.fails   = [];
            this._index  = 0;
            this.failed  = 0;
            this.loaded  = 0;
            this.percent = '0%';
            this._init(source);            
            this.total = this._source.length;
            this._load();
        }

        Loader.prototype = {
            _rsuffix: /\.(js|css)$/,
            _init: function (src) {
                 if (typeof src === 'string') {
                     this._source.push(src);
                 } else if (Array.isArray(src)) {
                     this._source = src;
                 } else
                     throw 'Loader Error: arguments must be String|Array.';
            },
            _get_load_method: function (src) {
                var type = (type = src.match(this._rsuffix)) ? type[1] : 'img';
                return '_' + type;
            },
            _js: function (url, ok) {
                var self = this;
                var script = document.createElement('script');
                script.onload = function () {
                    ok && ok.call(self, true, url);
                };
                script.onerror = function () {
                    ok && ok.call(self, false, url);
                };
                script.type = 'text/javascript';
                script.src = url;
                document.head.appendChild(script);
            },
            _css: function (url, ok) {
                var self = this;
                var link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = url;
                document.head.appendChild(link);
                ok && ok.call(self, true, url);
            },
            _img: function (url, ok) {
                var self = this;
                var img = new Image();
                img.onload = function () {
                    images[url] = img;
                    ok && ok.call(self, true, url);
                };
                img.onerror = function () {
                    ok && ok.call(self, false, url);
                };
                img.src = url;
            },
            _load: function () {
                if (this._index == this._source.length)
                    return this._onend();
                var src = this._source[this._index];
                if (!src) return;
                var method = this._get_load_method(src);
                this[method](src, this._loadend);
                this._onloadstart(src);
            },
            _loadend: function (done, src) {
                if (done)
                    ++this.loaded;
                else {
                    ++this.failed;
                    this._fails.push(src);
                }
                ++this._index;
                this.percent = Math.ceil(this._index / this.total * 100) + '%';
                this._onloadend(done, src);
                this._load();
            },
            _onloadstart: function(){},
            _onloadend: function(){},
            _onend: function(){},
            loadstart: function (handler) {
                if (typeof handler === 'function')
                    this._onloadstart = handler;
                return this;
            },
            loadend: function (handler) {
                if (typeof handler === 'function')
                    this._onloadend = handler;
                return this;
            },
            complete: function (handler) {
                if (typeof handler === 'function')
                    this._onend = handler;
                return this;
            },
            image: function (url, val) {
                if(arguments.length == 1){
                    if(undefined == url) {
                        return images;
                    }
                    var img = images[url];
                    if (img)
                        return img;
                    img = new Image();
                    img.src = url;
                    return img;
                }
                if(arguments.length == 2){
                    images[url] = val;
                }
            }
        }

        var LoaderMsk = function(source, color, cb){
            var doc = document,
                args = arguments,
                color = typeof color == 'string' ? color : '#E44B46';
            var _loadDom = doc.getElementById('MP_loading'),
                _txtDom = doc.getElementById('MP_precent');
            if(!_loadDom){
                _loadDom = doc.createElement('div');
                _loadDom.className = 'mp_loading';
                _loadDom.innerHTML = '<div class="mp_loading_clip"><div class="mp_loading_bar"><i style="background-color:' +color+ '"></i></div></div>';
                _txtDom = doc.createElement('txt');
                _txtDom.className = 'mp_loading_txt';
                _loadDom.calssName = 'mp_loading';
                _loadDom.appendChild(_txtDom);
                document.body.appendChild(_loadDom);
            }
            this._loadDom = _loadDom;
            this._txtDom = _txtDom;
            var me = this;
            var ok = args[args.length - 1];
            ok = typeof ok == 'function' ? ok : function(){};
            new Loader(source).loadend(function(percent){
                me._txtDom.innerHTML = this.percent;
            }).complete(function(){
                me._loadDom.style.display = 'none';
                ok.apply(me);
            });
        }
            exports.Loader = Loader;  
            halo.add('loader',Loader);       
})(window);/*  |xGv00|e1c576d1c6fe7da3e3b7f0cfdaa7afe1 */