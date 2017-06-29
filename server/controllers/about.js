import fs from 'fs';

var controller = {
	get : function(req, res){
	    fs.readFile('server/views/index.html',function (err, data){
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