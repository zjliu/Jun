//var fileReg=/^(\/[a-zA-Z0-9\_\-]+)+(\.[a-zA-Z0-9\_\-])*(\.[a-zA-Z0-9\_\-]+)+$/;
var fileReg=/^(?:\/[a-zA-Z0-9\_\.\-]+)*(?:\/[a-zA-Z0-9\_\-\.]+\.[a-zA-Z]+)$/;
var pathReg=/^(\/[a-zA-Z0-9\_]+)+\/?$/;
var Config = require("./.config");
var home = Config.getConfig("home");
var isRightHome = pathReg.test(home);

function route(handle,pathname,response){
	console.log([pathname,fileReg.test(pathname),isRightHome]);
	if(fileReg.test(pathname)){
		if(isRightHome){
			pathname = home + pathname;
		}
		handle["resource"].getFile(response,pathname);
	}
	else{
		handle["resource"].rewrite(response,pathname);
	}
}
exports.route = route;
