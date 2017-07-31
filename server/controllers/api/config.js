import fs from 'fs';
import lo from 'lodash';
import path from 'path';
import queryFolderReader from '../../src/QueryReader/index.js';
import JSON5 from 'json5';
import appConfig from '../../../config/config.js';

var controller = {
	getConnection : function(req, res){
		var connectionPath = path.join(__dirname, '../../../config/connections.js');
	    fs.readFile(connectionPath,function (err, data){
	        if (err) {
	            throw err;
	        }
	        var config = JSON5.parse(data);
			if(appConfig.lockConnection){
				config = lo.filter(config, k=> k.name == appConfig.lockConnection);
			}
	        var toSend = lo.map(config, k=> ({
	        	name: k.name,
	        	host: k.host,
	        	driver: k.driver,
				locked: appConfig.lockConnection
	        }));
	        var toSendStr = JSON.stringify(toSend);
	        res.writeHead(200, {'Content-Type': 'application/json','Content-Length':toSendStr.length});
	        res.write(toSendStr);
	        res.end();
	    });
	},
	getQuery : function(req, res){
		var folder = path.join(__dirname, "../../../config/queries");

		queryFolderReader(folder, (data) => {
			var toSendStr = JSON.stringify(data);
			res.writeHead(200, {'Content-Type': 'application/json','Content-Length':toSendStr.length});
			res.write(toSendStr);
			res.end();
		});
	}
};

export default controller;