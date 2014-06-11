var JunDialog = (function(){
	var options = {
		'title':'JunDialog',
		'width':600,
		'height':400,
		'modal':true,
		'showStart':true,
		'draggable':false
	}
	var Dialog = function(opts){
		this.options =  options;
		for(var key in opts){
			this.options[key] = opts[key];	
		}
		this.init();
		this.bind();
	}
	Dialog.prototype={
		init:function(){
			var _=this;
			var o = document.createElement("div");
			var m = o.cloneNode(0);
			var body = document.body;
			_.o=o;
			_.m=m;
			o.className='JunDialog';
			m.className='JD_mask';
			o.innerHTML = '<div class="JD_inner">'
			+'<div class="JD_title"></div>'	
			+'<div class="JD_body"></div>'	
			+'</div><div class="JD_cmd">'
			+'<a class="JD_cmd_close" href="javascript:;"></a>'
			+'</div></div>';
			_.el={};
			_.el.titleEl = o.childNodes[0].childNodes[0];
			_.el.bodyEl = o.childNodes[0].childNodes[1];
			_.el.cmdEl = o.childNodes[1];
			body.appendChild(o);
			body.appendChild(m);

			_.initeData();
		},
		initeData:function(){
			function E(f, e, o) {
				if (!e) e = 'load';
				if (!o) o = window;
				if(o.attachEvent) {
					o.attachEvent('on' + e, f)
					} else {
					o.addEventListener(e, f, false)
				}
			} 
			var _=this;
			var opts = _.options;
			_.o.style.width=opts.width;
			_.o.style.height=opts.height;
			if(!opts.modal){
				_.m.style.display='none';
				_.m.style.opacity=0;
				_.m.style.filter='alpha(opacity=0)';
			}
			if(opts.showStart) _.show(); else _.hide();
			if(opts.draggable) _.o.setAttribute('draggable',true);


			document.body.onselectstart=function(e){
				e = e || window.event;
				var target = e.target || e.srcElement;
				return target.className==="JD_title";
			}

			_.el.titleEl.innerHTML= opts.title;
		},
		bind:function(){
			var _=this;
			_.el.cmdEl.onclick=function(e){
				e = e || window.event;
				var target = e.target || e.srcElement;
				if(target.className==='JD_cmd_close'){
					_.hide();		
				}
			}
		},
		hide:function(){
			this.o.style.display="none";
			if(this.options.modal)
			this.m.style.display="none";
		},
		show:function(){
			this.o.style.display="block";
			if(this.options.modal)
			this.m.style.display="block";
		}
	}
	return Dialog;
	})();
