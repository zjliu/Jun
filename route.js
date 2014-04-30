//var fileReg=/^(\/[a-zA-Z0-9\_\-]+)+(\.[a-zA-Z0-9\_\-])*(\.[a-zA-Z0-9\_\-]+)+$/;
var fileReg=/^(?:\/[a-zA-Z0-9\_\.\-]+)*(?:\/[a-zA-Z0-9\_\-\.]+\.[a-zA-Z0-9]+)$/;
var serverfileReg=/^(?:\/[a-zA-Z0-9\_\.\-]+)*(?:\/[a-zA-Z0-9\_\-\.]+\.server.js+)$/;
var indexReg = /^(?:\/[a-zA-Z0-9\_\.\-]+)*\/$/;
var pathReg=/^(\/[a-zA-Z0-9\_]+)+\/?$/;
var Config = require("./.config");
var home = Config.getConfig("home");
var isRightHome = pathReg.test(home);

function route(handle,pathname,response,request){
	//console.log([pathname,fileReg.test(pathname),isRightHome]);
	if(indexReg.test(pathname)){
		pathname += "index.html";
	}
	var newPathname = pathname + ".server.js";
	var type = serverfileReg.test(pathname) ? "p1" : (fileReg.test(pathname)?"p2":(serverfileReg.test(newPathname)?"p3":null));
	var path = type === "p1" || type === "p2" ? pathname : newPathname;
	if(type){
		if(isRightHome){
			pathname = home +path;
		}
		if(type==="p2"){
			handle["resource"].getFile(response,pathname);
		}else if(type==="p1" || type === "p3"){
			handle["resource"].getServer(response,pathname,request);
		}
		return;
	}
	response.end();
}
exports.route = route;
