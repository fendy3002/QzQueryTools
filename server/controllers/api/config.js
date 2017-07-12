import fs from 'fs';
import lo from 'lodash';
import path from 'path';
import queryFolderReader from '../../src/QueryReader/index.js';
import JSON5 from 'json5';

var controller = {
	getConnection : function(req, res){
	    fs.readFile('config/connections.js',function (err, data){
	        if (err) {
	            throw err;
	        }
	        var config = JSON5.parse(data);
	        var toSend = lo.map(config, k=> ({
	        	name: k.name,
	        	host: k.host,
	        	driver: k.driver
	        }));
	        var toSendStr = JSON.stringify(toSend);
	        res.writeHead(200, {'Content-Type': 'application/json','Content-Length':toSendStr.length});
	        res.write(toSendStr);
	        res.end();
	    });
	},
	getQuery : function(req, res){
		var folder = path.join(__dirname, "../../../config/queries");

		var data = queryFolderReader(folder);
		var toSendStr = JSON.stringify(data);
		res.writeHead(200, {'Content-Type': 'application/json','Content-Length':toSendStr.length});
        res.write(toSendStr);
        res.end();
	}
};

export default controller;