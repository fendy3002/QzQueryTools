import fs from 'fs';

var controller = {
	post : function(req, res){
	    var toWrite = JSON.stringify(
	    	{
	    		...req.body,
	    		...req.params
	    	}
    	);
	    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':toWrite.length});
        res.write(toWrite);
        res.end();
	}
};

export default controller;