import fs from 'fs';
import path from 'path';

var controller = {
	get : function(req, res){
		var viewPath = path.join(__dirname, '../views/index.html');
	    fs.readFile(viewPath,function (err, data){
	        if (err) {
	            throw err;
	        }
	        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
	        res.write(data);
	        res.end();
	    });
	}
};

export default controller;