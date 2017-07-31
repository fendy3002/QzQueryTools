import fs from 'fs';
import lo from 'lodash';
import path from 'path';
import QueryFolderReader from '../../src/QueryReader/index.js';
import MySqlQuery from '../../src/MySqlQuery/index.js';
import PasswordHandler from '../../src/PasswordHandler/index.js';
import appConfig from '../../../config/config.js';
import JSON5 from 'json5';

var controller = {
	post : function(req, res){
		var connectionName = req.body.connection;
		var queryPath = req.body.query;
		var params = JSON.parse(req.body.params || "{}");

		getConfig(connectionName, queryPath, (config) => {
			if(!config.connection || !config.query){
				send400("connection and query is required", res);
				return;
			}
			var connection = {...config.connection};
			connection.password = PasswordHandler(config.app.key).decrypt(connection.password);
			MySqlQuery(connection, config.query, params, (data) => {
				if(data.success === false){
					toSendStr = JSON.stringify(data);
					res.set({'Content-Type': 'application/json','Content-Length':toSendStr.length});
					res.status(400);
					res.send(toSendStr);
					res.end();
					return;
				}
				else{
					var toSendStr = JSON.stringify(data);
					res.set({'Content-Type': 'application/json','Content-Length':toSendStr.length});
					res.status(200);
					res.send(toSendStr);
					res.end();
					return;
				}
			});
		});
	}
};

var send400 = (message, res) => {
	var toSendStr = JSON.stringify({
		message: message
	});
    res.set({'Content-Type': 'application/json','Content-Length':toSendStr.length});
	res.status(400);
    res.send(toSendStr);
    res.end();
}

var getConfig = (connectionName, queryPath, callback) => {
	var connectionPath = path.join(__dirname, '../../../config/connections.js');
    var connections = JSON5.parse(fs.readFileSync(connectionPath, 'utf8'));
	var queryFolder = path.join(__dirname, "../../../config/queries");
	var queries = QueryFolderReader(queryFolder, queries => {

		var connection = lo.filter(connections, k => k.name == connectionName)[0] || null;
		var query = getQuery(queries, queryPath) || null;

		callback({
			connection: connection,
			query: query,
			app: appConfig
		});
	});
};

var getQuery = function(queries, queryPath){
	for(var i = 0; i < queries.length; i++){
		var query = queries[i];
		if(query.children){
			var tempResult = getQuery(query.children, queryPath);
			if(tempResult){ return tempResult; }
		}
		else{
			var tempResult = query.filePath == queryPath ? query : null;
			if(tempResult){ return tempResult; }
		}
	}
};

export default controller;