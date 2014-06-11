var fs = require('fs');
function readFile(url,callback){
	fs.readFile(url,"utf-8",function(err,data){
		callback(err?err:data);	
	});
}
readFile("/home/mugeda/note.txt",function(data){
	console.log(data);
});
