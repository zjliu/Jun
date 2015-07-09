//#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');
var serverObj = require('./server');
var Game = serverObj.Game;
var RoomStatus = serverObj.RoomStatus;
var game = new Game();

var port = 8080;

var server = http.createServer(function(request, response) {
	console.log((new Date()) + ' Received request for ' + request.url);
	response.writeHead(404);
	response.end();
});

server.listen(port, function() {
	console.log((new Date()) + ' Server is listening on port '+port);
});

wsServer = new WebSocketServer({
	httpServer: server,
	// You should not use autoAcceptConnections for production 
	// applications, as it defeats all standard cross-origin protection 
	// facilities built into the protocol and the browser.  You should 
	// *always* verify the connection's origin and decide whether or not 
	// to accept it. 
	autoAcceptConnections: false
});

function originIsAllowed(origin) {
	// put logic here to detect whether the specified origin is allowed. 
	return true;
}

wsServer.on('request', function(request) {
	if (!originIsAllowed(request.origin)) {
		request.reject();
		console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
		return;
	}

	var query = request.resourceURL.query;
	var id = query.id;
	var reObj = game.addMember(id);
	var room = reObj.room;
	var member = reObj.member;

	var connection = request.accept('echo-protocol', request.origin);
	member.setConn(connection);

	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			var data = message.utf8Data;
			room.update(member,data);
		}
	});

	connection.on('close', function(reasonCode, description) {
		switch(reasonCode){
			case 1001:
				game.removeRoom(room);
			break;
		}
	});

	room.update(member);
});
