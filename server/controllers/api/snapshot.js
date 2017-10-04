import fs from 'fs';
import lo from 'lodash';
import path from 'path';
import JSON5 from 'json5';
import uuidv4 from 'uuid/v4';

import appConfig from '../../../config/config.js';
import QueryFolderReader from '../../src/QueryReader/index.js';

var controller = {
	post : function(req, res){
		var params = JSON5.parse(req.body.params || "{}") || {};
		var results = JSON5.parse(req.body.results || "{}") || {};
		var connectionName = req.body.connection;
		var queryPath = req.body.query;
		var uuid = uuidv4().replace(/-/g, "");

		getConfig(connectionName, queryPath, (config) => {
			var snapshotFolder = path.join(__dirname, '..', '..', '..', 'storage', 'snapshot');
			var snapshotFile = path.join(snapshotFolder, uuid);
			var snapshotModel = {
				params: params,
				config: config,
				connectionName: connectionName,
				queryPath: queryPath,
				results: results
			};
			fs.writeFile(snapshotFile, JSON5.stringify(snapshotModel), (err) => {
				res.set({'Content-Type': 'application/json','Content-Length':uuid.length});
				res.status(200);
				res.send({
					uuid: uuid
				});
				res.end();
			});
		});
	}
};

var getConfig = (connectionName, queryPath, callback) => {
	var connectionPath = path.join(__dirname, '..', '../../config/connections.js');
    var connections = JSON5.parse(fs.readFileSync(connectionPath, 'utf8'));
	var queryFolder = path.join(__dirname, '..', "../../config/queries");
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