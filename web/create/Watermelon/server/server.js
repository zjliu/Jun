var RoomStatus = {
	None:-1,
	One:1,
	Two:2,
	Play:3,
	Over:9
};

var reStatus = {
	Wait:-1,
	Play:0
}

function Game(){
	this.rooms = [];
}

Game.prototype = {
	add:function(){
	},
	findRoom:function(roomId){
		var rooms = this.rooms.filter(function(room){return room.roomId===roomId;});
		if(rooms && rooms.length) return rooms[0]; 
	},
	addMember:function(id){
		var rooms = this.rooms.filter(function(room){return room.status<RoomStatus.Two;});
		if(rooms && rooms.length) return rooms[0].addMember(id);
		else return this.addRoom().addMember(id);
	},
	addRoom:function(){
		var room = new Room(this.getNextRoomId());
		this.rooms.push(room);
		return room;
	},
	removeRoom:function(room,member){
		room.remove();
		var roomId = room.roomId;
		var index = 0;
		this.rooms.some(function(item,i){
			var isr = item.roomId === roomId;
			isr && (index = i);
			return isr;
		});
		this.rooms.splice(index,1);
	},
	getNextRoomId:function(){
		var max = 0;
		this.rooms.forEach(function(room){
			max = Math.max(room.roomId,max);
		});
		return max+1;
	}
}

function Room(roomId){
	this.red = null;
	this.yel = null;
	this.gameData = null;
	this.conn = null;
	this.status = RoomStatus.None;
	this.roomId = roomId;
}

Room.prototype = {
	addMember:function(id){
		var member = new Member(id);
		if(this.red){
			this.yel = member;
			this.status = RoomStatus.Two;
		}
		else{
			this.red = member;
			this.status = RoomStatus.One;
		}
		return {room:this,member:member};
	},
	update:function(member,data){
		var match = this.getMatcher(member);
		switch(this.status){
			case RoomStatus.One:
				member.send({action:'wait',roomId:this.roomId});
			break;
			case RoomStatus.Two:
				member.send({action:'prePlay',roomId:this.roomId});
				match.send({action:'play'});
				this.status = RoomStatus.Play;
			break;
			case RoomStatus.Play:
				match.send(data);
			break;
			case RoomStatus.Over:
			break;
		}
	},
	remove:function(member){
		var match = this.getMatcher(member);
		match.send({action:'over'});
	},
	getMatcher:function(member){
		return this.red === member ? this.yel : this.red;
	}
}

function Member(id){
	this.id = id;
}

Member.prototype={
	setConn:function(conn){
		this.conn = conn;
	},
	send:function(obj){
		this.conn.sendUTF(JSON.stringify(obj));
	}
}

exports.Game = Game;
exports.RoomStatus = RoomStatus;
