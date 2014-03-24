var MucardPicture = (function() {

	function E(f, e, o) {
		if (!e) e = 'load';
		if (!o) o = window;
		if (o.attachEvent) {
			o.attachEvent('on' + e, f)
		} else {
			o.addEventListener(e, f, false)
		}
	}

	function ajax(o) {
		var b = /POST/i.test(o.type),
			p = o.data || '',
			t = o.dataType,
			url = o.url || location.href,
			q = /\?/.test(url) ? '&' : '?',
			x = window.XMLHttpRequest ? new XMLHttpRequest() : (new ActiveXObject('Msxml2.XMLHTTP') || new ActiveXObject('Microsoft.XMLHTTP')),
			z = function (s) {
				if (x.readyState == 4) {
					if (x.status == 200) {
						s = x.responseText;
						if (t == 'json')
							s = json(s);
						if (b = o.success)
							b(s)
					} else if (o.error) {
						o.error(x.status, x)
					}
				}
			};
		x.onreadystatechange = z;
		if (typeof p == 'object') {
			var r = [];
			for (var k in p)
				r.push(encodeURIComponent(k) + '=' + encodeURIComponent(p[k]));
			p = r.join('&')
		}
		x.open(b ? 'POST' : 'GET', url + (b ? '' : ((p ? q : '') + p + (o.cache ? '' : (((!p && q == '?') ? '?' : '&') + '_=' + new Date().getTime())))),
				o.async === false ? false : true);
		if (b) x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		x.send(p);
		return x;
	}

	function stopDefault(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	var mPic = function(options) {
		/*
		E(function(e){
			stopDefault(e);
		},"touchmove",document.getElementById('picsDiv'));
		*/
		this.options = options || {};
		for(var key in this.options){
			this[key] = this.options[key];
		}
		this.init();
	}

	mPic.prototype = {
		init: function() {
			//初使化HTML
			this.createHTML();
			//绑定事件
			this.bindSourceEvent();
			this.bindPicEvent();
			this.openSource();
		},
		request:function(){
			//全屏并设置高度
			this.initHeight();
			//添加数据
			this.addNext(0);
		},
		openSource:function(){
			this.initHeight();
			this.loaded(0);
		},
		openPic:function(){
			this.imageData = [];
			var self = this;
			var url = "https://mugeda-mobile.mugeda.com/udata_list.php";
			ajax({
				"url":url,
				"type":"get",
				"success":function(data){
					var json = JSON.parse(data);
					if(json.status!==0){
						//alert(json.error);
					}
					json = udata;
					if(json && json["udata_list"].length){
						self.imageData = json["udata_list"];
						self.request();
					}
				}
			});
		},
		initHeight:function(){
			var currentUlEl = this.getCurrentUlEl();
			if(!currentUlEl) return;
			//全屏
			var picsDiv = this.picsDiv;
			var cWidth = 0;
			var cHeight = 0;
			cWidth = parseInt(getComputedStyle(picsDiv)["width"]);
			cHeight = parseInt(getComputedStyle(picsDiv)["height"]);
			var titleH = 51;
			currentUlEl.parentNode.parentNode.style.height = cHeight - 50 + "px";
			currentUlEl.parentNode.style.height = cHeight - 50 + 'px';

			//根据数据控制大小	
			if(!this.imageData) return;
			var floorCount = Math.ceil(this.imageData.length / parseInt((cWidth - 10) / (90 + 10)));
			var theight = (floorCount+1) * 90 + (floorCount + 1) * 10 + "px"
			currentUlEl.style.height = theight;
		},
		getCurrentUlEl:function(){
			var currentEl = this.picsDiv.getElementsByClassName("current")[0];
			if(currentEl){
				var ulEl = currentEl.getElementsByTagName("ul")[0];
				return ulEl;
			}
		},
		createHTML:function(){
			var picsDiv = document.createElement("div");
			picsDiv.classList.add("picsDiv");
			this.picsDiv=picsDiv;
			picsDiv.innerHTML='<div class="pics_nav">'
			+'<div class="pics_title">图片列表</div>'
			+'<div class="pics_cmd">'
			+'<a class="pics_cmd_left">我的素材</a>'
			+'<a class="pics_cmd_right"><img class="logImg" src="log.png" /></a>'
			+'<a class="pics_cmd_ok pics_cmd_tool pics_cmd_right"><img style="margin-top:16px;" src="ok.png" /></a>'
			+'<a class="pics_cmd_del pics_cmd_tool pics_cmd_right"><img style="margin-top:10px;" src="del.png" /></a>'
			+'</div></div>'
			+'<div class="wrapper current"><div class="source_list sourcePage"><ul>'
			+'<li>我的图片</li><li>我的签名</li><li>我的声音</li></ul></div></div>'
			+'<div class="wrapper"><div class="source_list pics_list"><ul></ul></div></div>'
			+'<div class="wrapper"><div class="source_list signature_list"><ul></ul></div></div>'
			+'<div class="wrapper"><div class="source_list audio_list"><ul></ul></div></div>'
			+'<div class="pics_foot"></div>'
			document.body.appendChild(this.picsDiv);
		},
		loaded:function(index){
			this.scroll = new iScroll(this.picsDiv.getElementsByClassName("source_list")[index]);
		},
		addNext: function(index) {
			if(this.imageData.length===0) return;
			var item = this.imageData[index];
			if(!item) return;
			var ulEl = this.getCurrentUlEl();
			if(!ulEl) return;
			var li = document.createElement("li");
			li.innerHTML = '<a><img class="refresh" src="refresh.gif" /></a><b></b>';
			li.setAttribute("id","picsli_"+item["ref_id"]);
			li.setAttribute("src",item["thumbnail"]);
			ulEl.appendChild(li);
			//this.loadImg(item.url,li.firstChild, index);
			this.loadImg("https://mugeda-mobile.mugeda.com"+item.url,li.firstChild, index);
		},
		loadImg: function(url, pli, index) {
			var self = this;
			var img = new Image();
			var length = self.imageData.length;
			img.onload = function(e) {
				pli.removeChild(pli.firstChild);
				pli.appendChild(img);
				self.resizeImg(img);
				if (index < length - 1) self.addNext(++index);
				else {
					self.loaded(1);
				}
			}
			img.onerror=function(e){
				if (index < length - 1) self.addNext(++index);
				else {
					self.loaded(1);
				}
			}
			img.src = url;
		},
		resizeImg: function(img) {
			if (!img) return;
			var parent = img.parentNode;
			var w = parseInt(getComputedStyle(parent)["width"])
			var h = parseInt(getComputedStyle(parent)["height"])
			var iw = img.width;
			var ih = img.height;
			var newW = w;
			var newH = h;
			if (iw > w || ih > h) {
				if (iw / ih > w / h) {
					img.width = w;
					newW = w;
					newH = w * (ih / iw);
					img.height = newH;
				} else {
					img.height = h;
					newH = h;
					newW = h / (ih / iw);
					img.width = newW;
				}
			}
			img.style.marginTop = (h - newH) / 2 + "px";
			img.style.marginLeft = (w - newW) / 2 + "px";
		},
		getSelected:function(){
			var resultLis = [];
			var ulEl = this.getCurrentUlEl();
			var lis = ulEl.getElementsByTagName('li');
			for(var i=0,l=lis.length;i<l;i++){
				var item = lis[i];
				var aEl = item.firstChild;
				if(aEl.classList.contains("on")){
					var id = this.getImageId(item.getAttribute("id"));
					var src = item.getAttribute("src");
					var data = {"id":id,"src":src};
					resultLis.push(data);
				}
			}
			return resultLis;
		},
		getImageId:function(liId){
			if(liId){
				return liId.split('_')[1];
			}
		},
		showOkAndDel:function(){
			this.selectData = this.getSelected();
			var length = this.selectData.length;
			var showOk = length === 1;
			var showDel = length > 0;
			this.okEl.style.display = showOk ? "block" : "none";
			this.delEl.style.display = showDel ? "block" : "none";
		},
		hideDel:function(){
			this.delEl.style.display = "none";
		},
		deleteImages:function(){
			var ul = this.getCurrentUlEl();
			for(var i=0,data=this.getSelected(),l=data.length;i<l;i++){
				var item = data[i];
				var liEl = document.getElementById("picsli_" + item.id);
				if(liEl){
					ul.removeChild(liEl);
				}
			}
		},
		switchPage:function(index){
			var wrapperEl = this.picsDiv.getElementsByClassName("wrapper");
			switch(index){
				case 0:
				this.openSource();
				break;
				case 1:
				this.openPic();
				break;
			}
			for(var i=0;wrapperEl[i];i++){
				var item = wrapperEl[i];
				if(i===index){
					item.classList.add("current");
					if(i===0) continue;
					var ulEl = item.getElementsByTagName("ul")[0];
					ulEl.innerHTML = "";
				}else{
					item.classList.remove("current");
				}
			}
		},
		bindSourceEvent:function(){
			var self = this;
			var sourceA = this.picsDiv.getElementsByClassName("pics_cmd_left")[0];
			sourceA.onclick=function(){
				self.switchPage(0);
			}
			var sourcePageEl = self.picsDiv.getElementsByClassName("sourcePage")[0];
			if(sourcePageEl){
				var lis = sourcePageEl.getElementsByTagName("li");
				for(var i=0;lis[i];i++){
					(function(index){
						var li = lis[index];
						li.onclick=function(e){
							self.switchPage(index+1);
						}
					})(i);
				}
			}
		},
		bindPicEvent:function(){
			var self = this;
			var ulEl = this.picsDiv.getElementsByClassName("pics_list")[0];
			var okEl = this.picsDiv.getElementsByClassName("pics_cmd_ok")[0];
			this.okEl = okEl;
			var delEl = this.picsDiv.getElementsByClassName("pics_cmd_del")[0];
			this.delEl = delEl;
			ulEl.onclick = function(e) {
				var ex = e || window.event;
				var target = ex.target || ex.srcElement;
				if (target.tagName.toLowerCase() === "img") {
					target = target.parentNode;
				}
				if (target.tagName.toLowerCase() === "a") {
					var aEl = target;
					aEl.classList.toggle("on");
					if (aEl.children.length === 1) {
						var span = document.createElement("span");
						span.classList.add("marker");
						aEl.appendChild(span);
					}
					else {
						aEl.removeChild(aEl.lastChild);
					}
				}
				self.showOkAndDel();
			}
			okEl.onclick = function(e){
				var src = self.selectData[0].src;
				var robj = {"status":0,"src":src};
				if(self.callback){
					self.callback(robj);
					self.hide();
				}
			}
			delEl.onclick = function(e){
				self.deleteImages();
				self.resize();
				self.hideDel();
			}
		},
		resize:function(){
			this.initHeight();	
		},
		show:function(){
			this.picsDiv.style.display="block";
		},
		hide:function(){
			this.picsDiv.style.display="none";
		}
	}
	return mPic;
})();

