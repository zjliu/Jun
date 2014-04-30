(function(request){
	var mongodb = require('./junMongodb');
	if(mongodb){
		var mongo = mongodb.mongoDb;
		if(!mongo) return {"status":0,data:"mongodb mongo undefined!"};
		mongo.dbName = "test";
		var arr = [];
		mongo.open(function(err,db){
			if(!err){
				db.collection('tbTest',function(err,collection){
					var cr = collection.find({age:1});
					cr.each(function(err,docs){
						arr.push(docs);
					});
				});
			}else{
				console.log(err);
			}
		});
		return {status:0,data:arr};
	}
})
