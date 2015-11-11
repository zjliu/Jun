/**
	create by liuzhijunsw@126.com
**/

var Watermelon = (function(){
	HTMLElement.prototype.getStyle = function(name,isFloat) { 
		var value = this.style[name] || getComputedStyle(this)[name]; 
		return isFloat ? parseFloat(value) : value;  
	}

	var isMobile = navigator.userAgent.match(/Android/i) || 
	    navigator.userAgent.match(/webOS/i) || 
	    navigator.userAgent.match(/iPhone/i) || 
	    navigator.userAgent.match(/iPad/i) || 
	    navigator.userAgent.match(/iPod/i) || 
	    navigator.userAgent.match(/BlackBerry/i) || 
	    navigator.userAgent.match(/Windows Phone/i);
	
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
	var tipBox = Q('.rule');
	var tip = Q('.tip');
	var playBtn = Q('.start');

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
				el.style[transitionProp] = 'all ease-in-out 0.5s';
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

		//websocket
		var socket = {};
		socket.connectId = +new Date;
		socket.host = 'ws://192.168.9.208:8080/';
		this.socket = socket;
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

			this.draw();
			this.initEvent();
		},
		begin:function(){
			var socket = this.socket;
			var url = socket.host + '?id=' + socket.connectId;
			this.ws = new WebSocket(url,'echo-protocol');
			this.initSocket();
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
		check:function(isRed){
			var self = this;
			var type = isRed ? "yellow" : "red";
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
				if(target.classList.contains('yellow')) return;
				if(!self.canMove) return;
				//移动棋子
				if(target.classList.contains('help')){
					var piece = self.lastPiece;
					self.removeHelp();
					var opx = piece.px;
					var opy = piece.py;
					var px = parseInt(target.dataset.px);
					var py = parseInt(target.dataset.py);
					delete self.statusObj[self.getIndex(opx,opy)];
					piece.update(px,py);
					piece.el.classList.toggle('active');
					self.statusObj[self.getIndex(px,py)]=piece;
					self.showRule();
					self.check(true);//检查是否要去子
					self.sendPlay(opx,opy,px,py);
					self.canMove = false;
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
			playBtn.addEventListener(click,this.begin.bind(this));
		},
		initSocket:function(){
			var self = this;
			var hasPlay = false;
			var actionEvent={
				wait:function(data){
					self.showTip();
					self.showRoomId(data.roomId);
				},
				prePlay:function(data){
					self.showTip('已匹配对手，开始游戏',true);
					self.showRoomId(data.roomId);
					setTimeout(function(){ 
						self.showTip(); 
						self.showPlay(); 
						hasPlay = true; 
					},1000);
				},
				play:function(mdata){
					if(!hasPlay){
						self.showTip();
						self.showPlay();
						hasPlay = true;
					}
					var data = mdata.data;
					data && self.playMove(data.opx,data.opy,data.tpx,data.tpy);
					self.canMove = true;
				},
				over:function(){
					self.showTip('对手已经逃跑，请重新游戏',true);
					setTimeout(function(){ self.showTip(); },1000);
				}
			}
			var wsEvent={
				open:function(e){

				},
				message:function(e){
					if(!e.data) return;
					var data = JSON.parse(e.data);
					if(typeof data === 'string') data = JSON.parse(data);
					var fun = actionEvent[data.action];
					fun && fun(data);
				},
				close:function(e){
					//self.showTip('游戏结束',false);
				},
				error:function(e){
					self.showTip('socket连接失败',false);
					setTimeout(function(){ self.showTip();},2000);
				}
			}

			for(var key in wsEvent) this.ws['on'+key] = wsEvent[key];
		},
		sendPlay:function(opx,opy,px,py){
			var data = {action:'play',data:{opx:opx,opy:opy,tpx:px,tpy:py}};
			this.ws.send(JSON.stringify(data));
		},
		playMove:function(opx,opy,tpx,tpy){
			oIndex = this.exChangeIndex(opx,opy);
			tIndex = this.exChangeIndex(tpx,tpy);
			var piece = this.statusObj[oIndex];	
			delete this.statusObj[oIndex];
			var obj = this.getPxPy(tIndex);
			piece.update(obj.px,obj.py);
			this.statusObj[tIndex]=piece;
			this.check();
		},
		exChangeIndex:function(px,py){
			var exArr = [0,3,4,1,2,13,14,15,16,17,18,19,20,5,6,7,8,9,10,11,12];	
			return exArr[this.getIndex(px,py)];
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
		showRule:function(){
			//gameEl.classList.toggle('redActive');
		},
		showTip:function(msg,showLoad){
			if(msg){
				Q('span',tip).innerText = msg;
				Q('svg',tip).classList.toggle(showLoad);
			}
			tip.classList.toggle('hidden');
			maskEl.classList.toggle('hidden');
		},
		showPlay:function(isplay){
			var s1 = isplay ? '.page2' : '.page1';
			var s2 = isplay ? '.page1' : '.page2';
			Q(s1).classList.remove('active');
			Q(s2).classList.add('active');
		},
		showRoomId:function(id){
			Q('.roomId').innerText = '房间编号：'+ id;
		},
		playAgain:function(){
			window.location.reload();
		}
	}
	return Watermelon;
})();
