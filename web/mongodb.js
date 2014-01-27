var mongodb = require('mongodb');

var server = new mongodb.Server("127.0.0.1",27017,{});//本地27017端口

var tbTest = new mongodb.Db("test",server,{});
/*
new mongodb.Db('test',server,{}).open(function(error,client){//数据库：mongotest
    if(error) throw error;
	var collection = new mongodb.Collection(client,'tbTest');//表：user
		/*
		collection.find(function(error,cursor){
			cursor.each(function(error,doc){
				if(doc){
					console.log("name:"+doc.name+" age:"+doc.age);
				}
			});
		});
		*/
});
*/
