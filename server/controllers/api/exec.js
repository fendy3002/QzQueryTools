import fs from 'fs';
import lo from 'lodash';
import path from 'path';
import QueryFolderReader from '../../src/QueryReader/index.js';
import MySqlQuery from '../../src/MySqlQuery/index.js';
import JSON5 from 'json5';

var controller = {
	post : function(req, res){
		var connectionName = req.body.connection;
		var queryPath = req.body.query;
		var params = JSON.parse(req.body.params || "{}");

		var config = getConfig(connectionName, queryPath);
		if(!config.connection || !config.query){
			send400("connection or query is required", res);
		}
		var queryResult = MySqlQuery(config.connection, config.query, params, (data) => {
			var toSendStr = JSON.stringify(data);
		    res.set({'Content-Type': 'application/json','Content-Length':toSendStr.length});
		    res.status(200);
		    res.send(toSendStr);
		    res.end();
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

var getConfig = (connectionName, queryPath) => {
    var connections = JSON5.parse(fs.readFileSync('server/storage/config/connections.js', 'utf8'));
	var queryFolder = path.join(__dirname, "../../storage/config/queries");
	var queries = QueryFolderReader(queryFolder);
	var connection = lo.filter(connections, k => k.name == connectionName)[0] || null;
	var query = lo.filter(queries, k=> k.filePath == queryPath)[0] || null;
	return {
		connection,
		query
	}
};

export default controller;