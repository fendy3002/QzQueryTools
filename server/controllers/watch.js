import fs from 'fs';
import lo from 'lodash';
import path from 'path';
import JSON5 from 'json5';
import appConfig from '../../config/config.js';
import QueryFolderReader from '../src/QueryReader/index.js';

var controller = {
	post : function(req, res){
		var params = JSON.parse(req.body.params || "{}");
		var connectionName = req.params.connection;
		var queryPath = req.params.query;
		getConfig(connectionName, queryPath, (config) => {
			if(!config.connection || !config.query){
				send400("connection and query is required", res);
				return;
			}
			res.set('Content-Type', 'text/html');
			res.render("index.watch.html", {
				title: config.query.head.description,
				params: params,
				connection: connectionName,
				query: queryPath,
				interval: req.body.interval > 0 ? 
					Math.max(req.body.interval, 500) :
					0
			});
			res.end();
		});
	}
};

var getConfig = (connectionName, queryPath, callback) => {
	var connectionPath = path.join(__dirname, '../../config/connections.js');
    var connections = JSON5.parse(fs.readFileSync(connectionPath, 'utf8'));
	var queryFolder = path.join(__dirname, "../../config/queries");
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

var send400 = (message, res) => {
	var toSendStr = message;
    res.set({'Content-Type': 'text/html','Content-Length':toSendStr.length});
	res.status(400);
    res.send(toSendStr);
    res.end();
}

export default controller;