var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1",27017,{auto_reconnect:true});
var Db = mongodb.Db;

var mongo = {
	"dbName":'test',
	"getDb":function(dbName){
		var db = db || this.dbName;
		return new Db(db,server,{safe:true});
	},
	"open":function(callback,dbName){
		var Db = this.getDb(dbName);
		Db.open(function(err,db){
			if(callback)
			callback(err,db);
		});
	}
}

exports.mongoDb = mongo;
