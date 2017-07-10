import mysql from 'mysql';
import lo from 'lodash';
var service = function(connection, query, params, next){
	var db = mysql.createConnection({
		host     : connection.host,
		user     : connection.username,
		password : connection.password,
		database : connection.db,
		multipleStatements: true
	});

	var result = {data: {}, query: query};
	db.config.queryFormat = function (query, values) {
		if (!values) return query;
		return query.replace(/\@(\w+)/g, function (txt, key) {
			if (values.hasOwnProperty(key)) {
				return this.escape(values[key]);
			}
			return txt;
		}.bind(this));
	};
	db.connect(function(err){
		if (err){
			handleSqlErr(err, next);
		}
		else{
			db.query(getScript(query, params), getParam(query, params), function(err, results) {
				if (err) {
					handleSqlErr(err, next);
				}
				else{
					next({
						...result,
						data: {...parseResult(results, query)}
					});
				}
				db.end();
			});
		}
	});
};

var handleSqlErr = function(err, next){
	var message = err.code == "ER_BAD_DB_ERROR" ? "Database not found." :
		err.code == "ER_ACCESS_DENIED_ERROR" ? "Username or password error" : 
		err.code == "ER_PARSE_ERROR" ? err.toString() : // sql syntax is incorrect
		err.code == "ER_SP_DOES_NOT_EXIST" ? err.toString() : // function is incorrect
		err.code == "ENOTFOUND" ? "Database host is either incorrect or cannot be accessed" : err.toString();

	next({
		"message": message,
		"success": false
	});
};

var getScript = function(query, params){
	return query.script;
};

var getParam = function(query, params){
	return params;
};

var parseResult = function(sqlData, query){
	var result = [];
	var tableNo = 0;
	var index = 0;
	for(index = 0; index < sqlData.length; index++){
		var labels = lo.filter(query.labels, 
			k=> k.index == tableNo + 1 // +1 because 1 based, as opposed to 0 based
		);
		var label = '';
		if(labels.length > 0){ label = labels[0].label; }
		else{ label = index + 1; }
		var currentTable = sqlData[index];
		if(currentTable.constructor && currentTable.constructor.name == "OkPacket"){
			continue;
		}
		else{
			if(Array.isArray(currentTable)){
				result.push(parseTable(currentTable, label));
				tableNo++;
			}
			else{
				result.push(parseTable(sqlData, label));
				tableNo++;
				return result;
			}
		}
	}
	return result;
};

var parseTable = function(table, label){
	var fields = [];
	if(table.length > 0){
		var firstData = table[0];
		fields = Object.keys(firstData);
	}
	var data = lo.map(table, k=> { return { ...k }; });
	return {
		label: label,
		data: data,
		fields: fields
	};
};

export default service;