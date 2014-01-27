var exec = require("child_process").exec;
var fs =require("fs");
var contentType=require("./contentType");
var methods = require("./methods");
var Config = require("./.config");
var Rules = loadRules();
var Config = require("./.config");

var rewriteReg = /Rewrite\s((?:\/[a-zA-Z0-9\_\-]+)+)\s((?:\/?[a-zA-Z0-9\_]+)+\.[a-z]+)/;

function loadRules(){
	var home = Config.getConfig("home");
	var config = Config.getConfig("userRewrite");
	var file = "."+ home + config;
	var rules={};
	fs.readFile(file,function(err,data){
		if(!err){
			data = data.toString();
			var lines = data.split("\n");
			for(var i=0,l=lines.length;i<l;i++){
				var re = lines[i];
				var result = rewriteReg.exec(re);
				if(result && result.length==3){
					rules[result[1]]=result[2];
				}
			}
			Rules=rules;
		}else{
			console.log("file:"+file + " cannot found!");
		}
	});
}

var resourceRequest={
	getFile:function(response,pathname){
		var self = this;
		fs.readFile("."+pathname,function(err,data){
			if(!err){
				var contentValue = contentType.getContentType(pathname);
				response.writeHead(200,{"Content-Type":	contentValue});
				response.write(data);
				response.end();
			}
			else{
				self.getFile(response,"/404.html");
			}
		});
	},
	rewrite:function(response,pathname){
		var target = Rules[pathname];
		console.log(Rules);
		if(target){
			console.log(target);		
		}
		pathname = this.excuteMethod(pathname);
		var method = methods.methods[pathname];
		if(method){
			response.write(method());
			response.end();
		}
		response.end();
	},
	excuteMethod:function(pathname){
		/*
		var paths = pathname.split("/");
		var myPaths = [];
		for(var i=0,l=paths.length;i<l;i++){
		}
		*/
		return pathname.substring(1);
	},
	start:function(response){
		exec("ls -lah",function(error,stdout,stderr){
			response.writeHead(200, {"Content-Type": "text/plain; charset=utf8"});
			response.write(stdout);
			response.end();
		});
	},
	upload:function(response){
	
	},
	download:function(response){

	}
}

exports.resource=resourceRequest;

