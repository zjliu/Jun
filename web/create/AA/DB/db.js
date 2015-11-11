var DB = (function() {
	var defaultOptions = [];
	var JunDB = function(options) {
		this.options = extend({},
		defaultOptions, options);
		for (var key in this.options) {
			this[key] = this.options[key];
		}
	}
	JunDB.prototype = {
		executeSql: function(callback) {
			if (!this.db) return;
			this.db.transaction(callback);
		},
		executeSqlData: function(sql, arr, success, error) {
			arr = arr || [];
			this.executeSql(function(tx) {
				tx.executeSql(sql, arr, success, error);
			});
		},
		create: function(tableName, cols, success, error) {
			var colsText = cols.join(',');
			this.executeSqlData('create table if not exists ' + tableName + '(' + colsText + ')', [], success, error);
			return this;
		},
		drop: function(tableName, success, error) {
			this.executeSqlData('drop table if exists ' + tableName, [], success, error);
			return this;
		},
		delete: function(tableName, success, error) {
			this.executeSqlData('delete from table if exists ' + tableName, [], success, error);
			return this;
		},
		insert: function(tableName, data, success, error) {
			var length = data.length;
			var qoteText = (function() {
				var s = "";
				for (var i = 0; i < length; i++) {
					s += "?,";
					if (i === length - 1) s = s.substring(0, s.length - 1);
				}
				return s;
			})(length);
			this.executeSqlData('insert into ' + tableName + ' values(' + qoteText + ')', data, success, error);
			return this;
		},
		insertOne: function(tableName, value, success, error) {
			this.insert(tableName, [value], success, error);
			return this;
		},
		select: function(sql, data, success, error) {
			this.executeSqlData(sql, data, function(tx, rs) {
				success(rs.rows);
			},
			error);
			return this;
		},
		selectAll: function(tableName, success, error) {
			this.executeSqlData('select * from ' + tableName, [], function(tx, rs) {
				success(rs.rows);
			},
			error);
			return this;
		}
	}
	return JunDB;
})();
