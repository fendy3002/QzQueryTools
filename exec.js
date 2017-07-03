const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');
const JSON5 = require('JSON5');
var Promise = require('promise');

var args = process.argv.slice(2);
var helpLine = "QzQueryTools exec.js\n" +
    "====================\n" +
    "Used by specifying the following commands:\n" +
    "prepare\t To prepare freshly cloned git. Run this command after clone / install\n" +
    "help\t To show this page";

var exec = function(args){
    if(args.length == 0){
    console.log(helpLine);
    }
    else{
        var command = args[0];
        if(command == "help"){
            console.log(helpLine);
        }
        else if(command == "prepare"){
            prepare();
        }
        else{
            console.log(helpLine);
        }
    }
};

var readFile = Promise.denodeify(fs.readFile);
var writeFile = Promise.denodeify(fs.writeFile);
var log = Promise.denodeify(console.log);
var prepare = function(){
    console.log("Copying query files...");
    var folder = path.join(__dirname, "server/storage/config");
    var exampleQuery = fs.createReadStream(path.join(folder, 'queries', '.script.example'));
    var actualQuery = fs.createWriteStream(path.join(folder, 'queries', 'script.example'));

    exampleQuery.pipe(actualQuery);
    exampleQuery.on('end', () => {
        console.log("Copying query files done");
    });

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
            for(var i = 0; i < connectionObj.length; i++){

            }
            return fs.writeFile(path.join(folder, "connection.js"), 
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
};


exec(args);