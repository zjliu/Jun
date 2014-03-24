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
			//获得图片数据
			this.getImageData();
			//全屏并设置高度
			this.initHeight();
			//绑定事件
			this.bindEvent();
			//添加数据
			this.addNext(0);
		},
		getImageData:function(){
			var arr = ["http://img0.bdstatic.com/img/image/shouye/meinv.jpg",
					   "http://img0.bdstatic.com/img/image/shouye/xiezhen1.jpg", 
					   "http://img0.bdstatic.com/img/image/fushi/kaishan.jpg"];
			arr = arr.concat(arr);
			arr = arr.concat(arr);
			arr = arr.concat(arr);
			var srcData = [];
			for(var i=0,l=arr.length;i<l;i++){
				srcData.push({"id":i,"src":arr[i]});
			}
			this.imageData = srcData;
		},
		initHeight:function(){
			//全屏
			var picsDiv = this.picsDiv;
			var cWidth = 0;
			var cHeight = 0;
			cWidth = parseInt(getComputedStyle(picsDiv)["width"]);
			cHeight = parseInt(getComputedStyle(picsDiv)["height"]);
			var titleH = 51;
			this.wrapper.style.height = cHeight - 50 + "px";

			//根据数据控制大小	
			var floorCount = Math.ceil(this.imageData.length / parseInt((cWidth - 10) / (90 + 10)));
			var theight = floorCount * 90 + (floorCount + 1) * 10 + "px"
			this.ulEl.style.height = theight;
			this.ulEl.parentNode.style.height = theight;

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
			+'</div></div><div id="wrapper" class="wrapper">'
			+'<div class="pics_list"><ul></ul></div>'
			+'</div><div class="pics_foot"></div>'
			this.wrapper = picsDiv.getElementsByClassName('wrapper')[0];
			this.ulEl = this.wrapper.getElementsByTagName('ul')[0];
			this.okEl = picsDiv.getElementsByClassName("pics_cmd_ok")[0];
			this.delEl = picsDiv.getElementsByClassName("pics_cmd_del")[0];
			document.body.appendChild(this.picsDiv);
		},
		loaded:function(){
			this.scroll = new iScroll('wrapper');
		},
		addNext: function(index) {
			var item = this.imageData[index];
			var li = document.createElement("li");
			li.innerHTML = '<a><img class="refresh" src="refresh.gif" /></a><b></b>';
			li.setAttribute("id","picsli_"+item.id);
			li.setAttribute("src",item.src);
			this.ulEl.appendChild(li);
			this.loadImg(item.src,li.firstChild, index);
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
					self.loaded();
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
			var lis = this.ulEl.getElementsByTagName('li');
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
			var ul = this.ulEl;
			for(var i=0,data=this.getSelected(),l=data.length;i<l;i++){
				var item = data[i];
				var liEl = document.getElementById("picsli_" + item.id);
				if(liEl){
					ul.removeChild(liEl);
				}
			}
		},
		bindEvent: function() {
			var self = this;
			this.ulEl.onclick = function(e) {
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
			this.okEl.onclick = function(e){
				var src = self.selectData[0].src;
				var robj = {"status":0,"src":src};
				if(self.callback){
					self.callback(robj);
					self.hide();
				}
			}
			this.delEl.onclick = function(e){
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

