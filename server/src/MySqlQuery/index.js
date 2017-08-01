import mysql from 'mysql';
import lo from 'lodash';
import appConfig from '../../../config/config.js';
var execQueryRaw = (db, params, queryTimeout, next) => function(query){
	return new Promise(resolve => {
		var queryModel = {
			sql: getScript(query, params),
			timeout: queryTimeout,
			values: getParam(query, params)
		};
		db.query(queryModel, function(err, results) {
			if (err) {
				handleSqlErr(err, next);
			}
			else{
				resolve(results);
			}
		});
	});
};

var getResult = (connection, query, params, next) => async function(db){
	var queryTimeout = query.head.timeout || connection.timeout || appConfig.defaultTimeout;
	var result = {data: {}, query: query, params: params};
	var execQuery = execQueryRaw(db, params, queryTimeout, next);

	var dataResult = [];
	for(var i = 0; i < query.queries.length; i++){
		var sqlQuery = query.queries[i];
		var sqlQueryResult = await execQuery(sqlQuery);

		dataResult.push({
			label: query.label,
			...parseResult(sqlQueryResult)
		});
	}
	
	db.end();

	return {
		...result,
		data: dataResult
	};
};

var parseResult = function(sqlData){
	var result = [];
	if(!sqlData || sqlData.length == 0){
		return {
			data: [],
			fields: []
		}
	}
	else if(Array.isArray(sqlData[0]) || 
		(sqlData[0].constructor && sqlData[0].constructor.name == "OkPacket")){
		// if has multistatement such as setting variable, get the latest result
		return parseTable(sqlData[sqlData.length - 1]);
	}
	else{
		return parseTable(sqlData);
	}
};

var parseTable = function(table){
	var fields = [];
	if(table.length > 0){
		var firstData = table[0];
		fields = Object.keys(firstData);
	}
	var data = lo.map(table, k=> { return { ...k }; });
	return {
		data: data,
		fields: fields
	};
};

var service = function(connection, query, params, next){
	var db = mysql.createConnection({
		host     : connection.host,
		user     : connection.username,
		password : connection.password,
		database : connection.db,
		port     : connection.port || 3306,
		dateStrings: 'date',
		multipleStatements: true
	});

	var result = {data: {}, query: query, params: params};
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
			getResult(connection, query, params, next)(db).then(result => {
				next(result);
			}).catch(err => {
				console.log("err", err);
			});
		}
	});
	db.on('error', function(err) {
		if (!err.fatal) {
			return;
		}
		handleSqlErr(err, next);
	});
};

var handleSqlErr = function(err, next){
	var message = err.code == "ER_BAD_DB_ERROR" ? "Database not found." :
		err.code == "ER_ACCESS_DENIED_ERROR" ? "Username or password error" : 
		err.code == "ER_PARSE_ERROR" ? err.toString() : // sql syntax is incorrect
		err.code == "ER_SP_DOES_NOT_EXIST" ? err.toString() : // function is incorrect
		err.code == "PROTOCOL_SEQUENCE_TIMEOUT" ? "[Timeout] " + err.toString() :
		err.code == "ENOTFOUND" ? "Database host is either incorrect or cannot be accessed" : 
		err.code + ":" + err.toString();

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

export default service;