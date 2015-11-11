/**
	create by liuzhijunsw@126.com
**/

var Watermelon = (function(){
	HTMLElement.prototype.getStyle = function(name,isFloat) { 
		var value = this.style[name] || getComputedStyle(this)[name]; 
		return isFloat ? parseFloat(value) : value;  
	}
	var isMobile = 'ontouchstart' in window;
	var click = isMobile ? "touchstart" : "click";
	var G = function(id) { return document.getElementById(id) };
	var Q = function(selector,dom,all) { return (dom || document)["querySelector"+(all?"All":"")](selector) }

	function getVendorPrefix() {
		var body = document.body || document.documentElement,
		style = body.style,
		vendor = ['webkit', 'khtml', 'moz', 'ms', 'o' , 'Moz'];
		if(typeof style.transform === 'string') return '';
		for(var i=0,l=vendor.length;i<l;i++){ 
			var item = vendor[i];
			if(typeof style[item+'Transition'] === 'string') return item;
		}
	}
	var vendor = getVendorPrefix();
	var transformProp =  vendor ? vendor+'Transform' : 'transform';
	var transitionProp =  vendor ? vendor+'Transition' : 'transition';

	var gameEl = Q('.game');
	var tipBtn = Q('.showTipBtn');
	var closeBtn = Q('.close');
	var maskEl = Q('.mask');
	var tipBox = Q('.tip');
	var playBtn = Q('.playBtn');
	if(!isMobile){
		gameEl.style.width = 400+'px';
		gameEl.style.height = 400+'px';
	}

	var piecesEl = Q('.pieces',gameEl),
		borderW = 5,	//圆的边框
		bbW = borderW * 2,
		W = gameEl.getStyle('width',true) - bbW,
		R = W/2,
		r = 0.3*W/2+borderW,
		mr = 0.11*W/2;

	var hsinr = r/2/R,
		hcosr = Math.sqrt(1-hsinr*hsinr);
	
	var sinr = 2*hsinr*hcosr;
	var cosr = hcosr*hcosr - hsinr*hsinr;

	var rx = R*cosr;
	var ry = R*sinr;

	var piecesData = [
		[{x:0,y:0},{x:r,y:0},{x:0,y:-r},{x:-r,y:0},{x:0,y:r}],	//中心圆
		[{x:R,y:0},{x:rx,y:-ry},{x:R-r,y:0},{x:rx,y:ry}],	//右圆
		[{x:0,y:-R},{x:-ry,y:-rx},{x:0,y:r-R},{x:ry,y:-rx}],	//上圆
		[{x:-R,y:0},{x:-rx,y:ry},{x:r-R,y:0},{x:-rx,y:-ry}],//左圆
		[{x:0,y:R},{x:ry,y:rx},{x:0,y:R-r},{x:-ry,y:rx}] //下圆
	];

	//0,1,2,3,4,10,11,12,13,20,21,22,23,30,31,32,33,40,41,42,43
	var piecesLinks = [
		[0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
		[1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
		[1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[0,1,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
		[0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0],
		[0,0,1,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1],
		[0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
		[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0],
		[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0]
	];

	function Piece(type,pdata){
		this.type = type;
		var px = pdata[0];
		var py = pdata[1];
		this.px = px;
		this.py = py;
		this.position = piecesData[px][py];
		this.x = this.position.x+R-mr;
		this.y = this.position.y+R-mr;
	}

	Piece.prototype={
		draw:function(isPlay,ox,oy){
			var self = this;
			var el = this.el;
			if(!el){
				el = document.createElement('span');
				el.classList.add('piece');
				el.dataset.type = this.type;
				el.classList.add(this.type);
				if(this.type==='help'){
					el.dataset.px=this.px;
					el.dataset.py=this.py;
				}
				piecesEl.appendChild(el);
			}
			if(isPlay){
				/*
				if(ox!==this.x && oy!==this.y){
					el.style.transition = 'all ease 0.5s';
					el.style.transformOrigin = '0px '+(-r)+'px';
					el.style.transform='rotateZ(-90deg)';
					setTimeout(function(){
						el.style.transition = '';
						el.style.transform = '';
						el.style.left = self.x+'px';
						el.style.top = self.y+'px';
					},500);
				}
				else{
					el.style.transition = 'all ease 0.5s';
					el.style.transformOrigin = '';
					el.style.transform='translate('+(this.x-ox)+'px,'+(this.y-oy)+'px)';
					setTimeout(function(){
						el.style.transition = '';
						el.style.transform = '';
						el.style.left = self.x+'px';
						el.style.top = self.y+'px';
					},500);
				}
				*/
				el.style[transitionProp] = 'all ease 0.5s';
				el.style[transformProp]='translate3d('+(this.x-ox)+'px,'+(this.y-oy)+'px,0px)';
				setTimeout(function(){
					el.style[transitionProp]='';
					el.style[transformProp]='';
					el.style.left = self.x+'px';
					el.style.top = self.y+'px';
				},500);
			}
			else{
				el.style.left = this.x+'px';
				el.style.top = this.y+'px';
			}	
			this.el = el;
		},
		update:function(px,py){
			px=parseFloat(px);
			py=parseFloat(py);
			this.position = piecesData[px][py];
			var ox = this.x;
			var oy = this.y;
			this.x = this.position.x+R-mr;
			this.y = this.position.y+R-mr;
			this.px = px;
			this.py = py;
			this.draw(true,ox,oy);
		}
	}

	var Watermelon = function(){
		this.data=[];
		this.statusObj = {};
		this.helpArr=[];
		this.init();
		this.isRed = true;//当前是红方先手
	}

	Watermelon.prototype={
		init:function(){
			var redPosition =	[[1,3],[3,1],[4,0],[4,1],[4,2],[4,3]];
			var yellowPosition= [[3,3],[1,1],[2,0],[2,1],[2,2],[2,3]];
			var self = this;
			function add(item){
				var piece = new Piece(this.type,item);
				self.statusObj[self.getIndex(piece.px,piece.py)] = piece;
				self.data.push(piece);
			}
			redPosition.forEach(add.bind({type:'red'}));
			yellowPosition.forEach(add.bind({type:'yellow'}));
			this.initEvent();
		},
		draw:function(){
			this.data.forEach(function(item){item.draw()});
		},
		findPiece:function(el){
			var arr=this.data.filter(function(item){return item.el===el;});
			if(arr.length) return arr[0];
		},
		getNearbyPieces:function(piece){
			var px = piece.px;
			var py = piece.py;
			var index = this.getIndex(px,py);
			var row = piecesLinks[index];
			var arr = [];
			var self = this;
			row.forEach(function(item,index){
				if(!item || self.statusObj[index]) return;
				arr.push(index);
			});
			return arr;
		},
		showPath:function(piece){
			var self = this;
			var arr = this.getNearbyPieces(piece);
			arr.forEach(function(index){
				var pxpy = self.getPxPy(index);
				var piece = new Piece('help',[pxpy.px,pxpy.py]);
				piece.draw();
				self.helpArr.push(piece.el);
			});
			this.lastPiece = piece;
		},
		check:function(){
			var self = this;
			var type = this.isRed ? "red" : "yellow";
			//初步得到要检查的棋子,一方动后，只可能另一方的子被吃，并且只可能是不能动的子
			var arr = self.data.filter(function(piece){
				return piece.type===type && !self.getNearbyPieces(piece).length;
			});
			if(!arr.length) return;
			//如果自己不能动，并且与之连通的子都不能动的话，此子和与之连通的子都死了
			var useObj = {};
			arr.forEach(function(piece){
				//对已经检查过的子不再检查
				if(useObj[self.getIndex(piece.px,piece.py)]!==undefined) return;
				var obj = self.checkPiece(piece);
				var paths = obj.paths;
				var isLive = obj.isLive;
				for(var key in paths){
					useObj[key] = isLive;
				}
			});
			for(var key in useObj){
				if(useObj[key]) continue;
				var piece = self.statusObj[key];
				if(!piece) continue;
				self.deletePiece(key,piece);
			}
		},
		checkPiece:function(piece){
			var self = this;
			var obj = {};//用于标记已经找过的节点
			var isLive = false;
			function find(piece){
				var px = piece.px;
				var py = piece.py;
				var index = self.getIndex(px,py);
				var row = piecesLinks[index];
				var type = piece.type;
				obj[index]=true;
				row.forEach(function(item,index){
					var piece = self.statusObj[index];
					if(item && piece && piece.type===type && !obj[index]) {
						if(self.getNearbyPieces(piece).length>0) isLive=true;
						else find(piece);
					}
				});
			}
			find(piece);
			return {isLive:isLive,paths:obj};
		},
		deletePiece:function(key,piece){
			var self = this;
			setTimeout(function(){
				var el = piece.el;
				delete self.statusObj[key];
				el && piecesEl.removeChild(el);
			},500);
		},
		initEvent:function(){
			var self = this;
			piecesEl.addEventListener(click,function(el){
				var target = el.target;
				if(!target.classList.contains('piece')) return;
				//确保是轮流下棋
				var type = target.dataset.type;
				if(type==='help' && self.lastPiece) type=self.lastPiece.type;
				if(self.isRed !== (type==='red')) return;
				//移动棋子
				if(target.classList.contains('help')){
					var piece = self.lastPiece;
					self.removeHelp();
					var px = target.dataset.px;
					var py = target.dataset.py;
					delete self.statusObj[self.getIndex(piece.px,piece.py)];
					piece.update(px,py);
					piece.el.classList.toggle('active');
					self.statusObj[self.getIndex(piece.px,piece.py)]=piece;
					self.isRed = !self.isRed;
					self.showTip();
					self.check();//检查是否要去子
					return;
				}
				//显示走子的路线
				var isActive = target.classList.contains('active');
				target.classList.toggle('active');
				self.removeHelp();
				if(!isActive) self.showPath(self.findPiece(target));
			});

			tipBtn.addEventListener(click,this.showBox);
			closeBtn.addEventListener(click,this.showBox);
			playBtn.addEventListener(click,this.playAgain);
		},
		removeHelp:function(){
			this.helpArr.forEach(function(el){
				piecesEl.removeChild(el);
			});
			this.helpArr=[];
		},
		getIndex:function(px,py){
			return px<1?py:5+(px-1)*4+py;
		},
		getPxPy:function(index){
			var px =0,py=0;
			if(index<5) py=index;
			else { px=Math.floor((index-5)/4)+1; py = (index-5)%4; }
			return {px:px,py:py};
		},
		showBox:function(){
			maskEl.classList.toggle('hidden');
			tipBox.classList.toggle('hidden');
		},
		showTip:function(){
			gameEl.classList.toggle('redActive');
		},
		playAgain:function(){
			window.location.reload();
		}
	}
	return Watermelon;
})();

var connectId = +new Date;
var orgUrl = 'ws://localhost:8080/?id='+connectId;

var ws = new WebSocket(orgUrl,'echo-protocol');

ws.onopen = function(evt){
	//ws.send('Test!');
};

ws.onmessage = function(evt){
	console.log(evt.data);
	//ws.close();
};

ws.onclose = function(evt){
	console.log('WebSocketClosed!');
};

ws.onerror = function(evt){
	console.log('WebSocketError!');
};
