var server = require("./server");
var route = require("./route");
var requestHandler = require("./requestHandlers");

server.start(route.route,requestHandler);
