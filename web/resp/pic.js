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
		var picsDiv = document.getElementById("picsDiv");
		var cWidth = parseInt(getComputedStyle(picsDiv)["width"]);
		var cHeight = parseInt(getComputedStyle(picsDiv)["height"]);
		var titleH = 51;
		document.getElementById("wrapper").style.height = cHeight - 50 + "px";

		var arr = ["http://img0.bdstatic.com/img/image/shouye/meinv.jpg", "http://img0.bdstatic.com/img/image/shouye/xiezhen1.jpg", "http://img0.bdstatic.com/img/image/fushi/kaishan.jpg"];
		var ulEl = listEl.firstElementChild;
		arr = arr.concat(arr);
		arr = arr.concat(arr);
		arr = arr.concat(arr);
		var floorCount = Math.ceil(arr.length / parseInt((cWidth - 10) / (90 + 10)));
		var theight = floorCount * 90 + (floorCount + 1) * 10 + "px"
		ulEl.style.height = theight;
		document.getElementById("pics_list").style.height = theight;
		addNext(0);

		/*
		E(function(e){
			stopDefault(e);
		},"touchmove",document.getElementById('picsDiv'));
		*/

	}

	mPic.prototype = {
		init: function() {
			addNext(0);
		},
		loaded:function(){
			this.scroll = new iScroll('wrapper');
		},
		addNext: function(index) {
			var item = arr[index];
			var li = document.createElement("li");
			li.innerHTML = '<a><img class="refresh" src="refresh.gif" /></a><b></b>';
			ulEl.appendChild(li);
			this.loadImg(item, li.firstChild, index);
		},
		loadImg: function(url, pli, index) {
			var self = this;
			var img = new Image();
			img.onload = function(e) {
				pli.removeChild(pli.firstChild);
				pli.appendChild(img);
				self.resizeImg(img);
				if (index < arr.length - 1) self.addNext(++index);
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
		bindEvent: function() {
			var listEl = document.getElementById("pics_list");
			listEl.onclick = function(e) {
				var ex = e || window.event;
				var target = ex.target || ex.srcElement;
				if (target.tagName.toLowerCase() === "img") {
					var aEl = target.parentNode;
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
			}
		}
	}
	return mPic;
})();

