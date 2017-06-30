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

	db.config.queryFormat = function (query, values) {
		if (!values) return query;
		return query.replace(/\@(\w+)/g, function (txt, key) {
			if (values.hasOwnProperty(key)) {
				return this.escape(values[key]);
			}
			return txt;
		}.bind(this));
	};
	db.connect();
	db.query(getScript(query, params), getParam(query, params), function(err, results) {
		if (err) throw err;
		next(parseResult(results, query));
	});
	db.end();
};

var getScript = function(query, params){
	return query.script;
};

var getParam = function(query, params){
	return params;
};

var parseResult = function(sqlData, query){
	var result = [];
	var index = 0;
	for(index = 0; index < sqlData.length; index++){
		var currentTable = sqlData[index];
		var labels = lo.filter(query.labels, 
			k=> k.index == index + 1 // +1 because 1 based, as opposed to 0 based
		);
		var label = '';
		if(labels.length > 0){ label = labels[0].label; }
		else{ label = index; }

		var fields = [];
		if(currentTable.length > 0){
			var firstData = currentTable[0];
			fields = Object.keys(firstData);
		}
		var data = lo.map(currentTable, k=> { return { ...k }; });
		result.push({
			label: label,
			data: data,
			fields: fields
		});
	}
	return result;
};

export default service;