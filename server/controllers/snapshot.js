import fs from 'fs';
import lo from 'lodash';
import path from 'path';
import JSON5 from 'json5';
import appConfig from '../../config/config.js';
import QueryFolderReader from '../src/QueryReader/index.js';

var controller = {
	get : function(req, res){
		var uuid = req.query.uuid;
		var snapshotFolder = path.join(__dirname, '..', '..', 'storage', 'snapshot');
		var snapshotFile = path.join(snapshotFolder, uuid);

		fs.readFile(snapshotFile, (err, data) => {
			var snapshotModel = JSON5.parse(data);
			res.set('Content-Type', 'text/html');
			res.render("index.snapshot.html", {
				title: snapshotModel.config.query.head.description,
				query: snapshotModel.config.query || {},
				params: snapshotModel.params || {},
				results: snapshotModel.results || {},
				uuid: uuid
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