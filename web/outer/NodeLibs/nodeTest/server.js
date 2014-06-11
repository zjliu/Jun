require("readfile");
var http=require('http');

var httpServer = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('<h1>Node.js</h1>');
	readFile("/home/mugeda/note.txt",function(data){
		res.write(data);
	});
	res.end('<p>hello word</p>');
});

httpServer.listen(3000);
console.log("Http server is listenning at port 3000");
