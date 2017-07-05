const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');
const JSON5 = require('JSON5');
var Promise = require('promise');
var PasswordHandler = require('../server/src/PasswordHandler/index.js');

var Service = function(root){
    var folder = path.join(root, "server/storage/config");
    var configObj = () => {
    	return JSON5.parse(fs.readFileSync(path.join(folder, 'config.js'), 'utf8'));
    };
    var template = function(handler){
	    var connectionPath = path.join(folder, 'connections.js');
	    var connectionObjs = JSON5.parse(fs.readFileSync(connectionPath, 'utf8'));
	    for(var i = 0; i < connectionObjs.length; i++){
	        connectionObjs[i].password = handler(connectionObjs[i].password);
	    }
	    fs.writeFileSync(path.join(folder, "connections.js"), 
	        JSON.stringify(connectionObjs, null, 4), 
	        "utf8");
	};
	var encrypt = function(){
	    console.log("Trying to encrypt connection...");
	    var handler = PasswordHandler(configObj().key).encrypt;
	    template(function(password){
	    	return handler(password);
	    });
	    console.log("Encrypt connection done");
	};
	var decrypt = function(){
	    console.log("Trying to decrypt connection...");
	    var handler = PasswordHandler(configObj().key).decrypt;
	    template(function(password){
	    	var decrypted = handler(password);
	        if(decrypted){
	        	return decrypted;
	        }
	        else{
        		return password;
	        }
	    });
	    console.log("Decrypt connection done");
	};
	var reencrypt = function(){
	    decrypt();
	    console.log("Changing config key...");
	    var config = configObj();
        config.key = uuid().replace(/-/g, "");
        fs.writeFileSync(path.join(folder, "config.js"), 
            JSON.stringify(config, null, 4), 
            "utf8");
        console.log("Changing config key done");
        encrypt();
	};
	return {
		encrypt,
		decrypt,
		reencrypt
	} 
};

module.exports = Service;