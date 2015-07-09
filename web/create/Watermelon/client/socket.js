	
var RoomStatus = {
	None:-1,
	One:1,
	Two:2,
	Play:3,
	Over:9
};

var connectId = +new Date;
var orgUrl = 'ws://localhost:8080/?id='+connectId;
var ws = new WebSocket(orgUrl,'echo-protocol');

var actionEvent={
	wait:function(){
		console.log('========');
		console.log('正匹配对手，请稍后');
		console.log('========');
	},
	prePlay:function(){
		console.log('========');
		console.log('==已匹配对手，对方先下==');
		console.log('========');
	},
	play:function(data){
		console.log('========');
		console.log('==轮到你了==');
		console.log('========');
	}
}

var wsEvent={
	open:function(e){

	},
	message:function(e){
		var data = JSON.parse(e.data);
		var fun = actionEvent[data.action];
		fun && fun(data);
	},
	close:function(e){
		console.log('WebSocketClosed!');
	},
	error:function(e){
		console.log('WebSocketError!');
	}
}


function addWsEvent(){
	for(var key in wsEvent) ws['on'+key] = wsEvent[key];
}

addWsEvent();
