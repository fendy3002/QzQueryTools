const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');
const JSON5 = require('json5');
var Promise = require('promise');
var PasswordHandler = require('../server/src/PasswordHandler/index.js');

var Service = function(root){
	var copyFile = function(fromPath, toPath){
		var fromFile = fs.createReadStream(fromPath);
    	var toFile = fs.createWriteStream(toPath);
    	
	    fromFile.pipe(toFile);
	    fromFile.on('end', () => {
	        console.log("Copying " + fromPath + " files done");
	    });
	}
	return {
		canPrepare: function(){
		    console.log("Checking if can prepare...");
		    var folder = path.join(root, "server/storage/config");
		    if(fs.existsSync(path.join(folder, "config.js"))){
		        console.log("Config already exists, use fprepare command instead");
		        return false;
		    }
		    return true;
		},
		prepare: function(){
		    console.log("Copying query files...");
		    var folder = path.join(root, "server/storage/config");

		    copyFile(path.join(folder, 'queries', '.script.example'),
	    		path.join(folder, 'queries', 'script.sql'));
		    copyFile(path.join(folder, 'queries', 'employees', '.script.example'),
	    		path.join(folder, 'queries', 'employees', 'get_employees_by_name.sql'));
		    copyFile(path.join(folder, 'queries', 'employees', '.script2.example'),
	    		path.join(folder, 'queries', 'employees', 'get_employees_in_department.sql'));

		    var saveConfig = (configObj) => {
		        return new Promise((resolve, reject) => {
		            configObj.key = uuid().replace(/-/g, "");
		            fs.writeFile(path.join(folder, "config.js"), 
		                JSON.stringify(configObj, null, 4), 
		                "utf8",
		                (err) => {
		                    if(err){ reject(err); }
		                    else{
		                        console.log("Copying config files done");
		                        resolve();
		                    }
		                });
		        });
		    };
		    var saveConnection = (configObj, connectionObj) => {
		        return new Promise((resolve, reject) => {
		            var encrypt = PasswordHandler(configObj.key).encrypt;
		            for(var i = 0; i < connectionObj.length; i++){
		                connectionObj[i].password = encrypt(connectionObj[i].password);
		            }
		            return fs.writeFile(path.join(folder, "connections.js"), 
		                JSON.stringify(connectionObj, null, 4), 
		                "utf8", (err) => {
		                    if(err){ reject(err); }
		                    else{ resolve(); }
		                });
		        })
		    };
		    console.log("Copying config files...");
		    var getConfigObj = new Promise((resolve, reject) => {
		        var configPath = path.join(folder, "config.js.example");
		        fs.readFile(configPath, "utf8", (err, data) => {
		            var configObj = JSON5.parse(data);
		            resolve(configObj);
		        });
		    });
		    var saveConfigObj = getConfigObj.then((configObj) => {
		        return saveConfig(configObj);
		    });
		    var getConnectionObj = new Promise((resolve, reject) => {
		        console.log("Copying connection file...");
		        var connectionPath = path.join(folder, 'connections.js.example');
		        fs.readFile(connectionPath, 'utf8', (err, data) => {
		            var connectionObj = JSON5.parse(data);
		            resolve(connectionObj);
		        });
		    });

		    var saveConnectionObj = Promise.all(
		        [
		            getConfigObj,
		            saveConfigObj,
		            getConnectionObj
		        ]).then((values) => {
		            return saveConnection(values[0], values[2]);
		        }).then(() => {
		            console.log("Copying connection files done");
		        }).catch(err => {
		            console.log("err", err);
		        });
		}
	};
};

module.exports = Service;