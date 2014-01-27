var http = require("http");
var url = require("url");

var Config = require("./.config");
var port = Config.getConfig("port");

function start(route,handle){
	function onRequest(request,response){
		var pathname = url.parse(request.url).pathname;
		route(handle,pathname,response);
	}
	var httpServer = http.createServer(onRequest);
	httpServer.listen(port);
}

exports.start=start;
