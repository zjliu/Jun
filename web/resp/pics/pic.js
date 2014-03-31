var MucardPicture = (function() {

	var isM = isMobile();
	var START = isM ? "touchstart": "mousedown";
	var MOVE = isM ? "touchmove": "mousemove";
	var END = isM ? "touchend": "mouseup";

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


	function E(f, e, o) {
		if (!e) e = 'load';
		if (!o) o = window;
		if (o.attachEvent) {
			o.attachEvent('on' + e, f)
		} else {
			o.addEventListener(e, f, false)
		}
	}

	function getTarget(e){
		var ex = e || window.event;
		var target = ex.target || ex.srcElement;
		return target;
	}

	function E_Click(f,o){
		var target=null;
		var isFire = true;
		E(function(e){
			target = getTarget(e);
		},START,o);
		E(function(e){
			if(isFire){
				var fTarget = getTarget(e);
				if(target===fTarget){
					f(e,fTarget);
				}
			}
			target = null;
			isFire = true;
		},END,o);
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
		this.options = options || {};
		for(var key in this.options){
			this[key] = this.options[key];
		}
		this.imageDomain = options.imageDomain || "https://mugeda-mobile.mugeda.com";
		this.imageUdataUrl = options.imageUdataUrl || "https://mugeda-mobile.mugeda.com/udata_list.php";
		this.signatureUdataUrl = options.signatureUdataUrl || "";
		this.audioUdataUrl = options.audioUdataUrl || "";
		this.imageDelUrl = options.imageDelUrl || "";
		this.logCallback = options.logCallback || function(){};
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
			ajax({
				"url":this.imageUdataUrl,
				"type":"get",
				"success":function(data){
					var json = JSON.parse(data);
					if(json.status!==0){
						alert(json.error);
						return;
					}
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
			var fpx = 50;
			var theight = floorCount * 90 + (floorCount + 1) * 10 + fpx + "px"
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
			+'<div class="pics_title"></div>'
			+'<div class="pics_cmd">'
			+'<a class="pics_cmd_left">我的素材</a>'
			+'<a class="pics_cmd_right pics_cmd_login"><img class="logImg" src="log.png" /></a>'
			+'<a class="pics_cmd_ok pics_cmd_tool pics_cmd_right"><img style="margin-top:16px;" src="ok.png" /></a>'
			+'<a class="pics_cmd_del pics_cmd_tool pics_cmd_right"><img style="margin-top:10px;" src="del.png" /></a>'
			+'</div></div>'
			+'<div class="wrapper current"><div class="source_list sourcePage"><ul>'
			+'<li index="1">我的图片</li><li index="2">我的签名</li><li index="3">我的声音</li></ul></div></div>'
			+'<div class="wrapper"><div class="source_list pics_list"><ul></ul></div></div>'
			+'<div class="wrapper"><div class="source_list signature_list"><ul></ul></div></div>'
			+'<div class="wrapper"><div class="source_list audio_list"><ul></ul></div></div>'
			+'<div class="pics_foot"></div>'
			document.body.appendChild(this.picsDiv);
		},
		loaded:function(index){
			E(function(e){
				e.preventDefault();
			},"touchmove",this.picsDiv);
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
			this.loadImg(this.imageDomain+item.url,li.firstChild, index);
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
			/*	
			if(this.imageDelUrl){
				ajax({
					"url":this.imageDelUrl,
					"type":"get",
					"data":{}
					"success":function(data){

					}
				});
			}
			*/
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
			this.setPageTitle(index);
		},
		setPageTitle:function(index){
			var sourcePageEl = this.picsDiv.getElementsByClassName("sourcePage")[0];
			if(sourcePageEl){
				var pageLi = sourcePageEl.getElementsByTagName("li")[index-1];
				var pageTitleDiv = this.picsDiv.getElementsByClassName("pics_title")[0];
				if(pageLi && pageTitleDiv){
					pageTitleDiv.innerText = pageLi.innerText;
				}
				if(index===0){
					pageTitleDiv.innerText = "";
					if(this.okEl){
						this.okEl.style.display="none";
					}
					if(this.delEl){
						this.delEl.style.display="none";
					}
				}
			}
		},
		bindSourceEvent:function(){
			var self = this;
			var sourceA = this.picsDiv.getElementsByClassName("pics_cmd_left")[0];
			this.sourceA = sourceA;
			E_Click(function(e,target){
				self.switchPage(0);
			},sourceA);
			var sourcePageEl = self.picsDiv.getElementsByClassName("sourcePage")[0];
			if(sourcePageEl){
				E_Click(function(e,target){
					if (target.tagName.toLowerCase() === "li") {
						var index =parseInt(target.getAttribute("index"));
						self.switchPage(index);
					}
				},sourcePageEl);
			}
		},
		bindPicEvent:function(){
			var self = this;
			var ulEl = this.picsDiv.getElementsByClassName("pics_list")[0];
			var okEl = this.picsDiv.getElementsByClassName("pics_cmd_ok")[0];
			this.okEl = okEl;
			var delEl = this.picsDiv.getElementsByClassName("pics_cmd_del")[0];
			this.delEl = delEl;
			var logEl = this.picsDiv.getElementsByClassName("pics_cmd_login")[0];
			this.logEl = logEl;
			E_Click(function(e,target){
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
			},ulEl);
			E_Click(function(e,target){
				var src = self.selectData[0].src;
				var robj = {"status":0,"src":src};
				if(self.callback){
					self.callback(robj,self);
				}
			},okEl);
			E_Click(function(e,target){
				self.deleteImages();
				self.resize();
				self.hideDel();
			},delEl);
			E_Click(function(e,target){
				if(self.logCallback){
					self.logCallback(self);
				}
			},logEl);
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

