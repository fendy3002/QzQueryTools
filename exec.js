const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');
const JSON5 = require('JSON5');
var Promise = require('promise');
var PasswordHandler = require('./server/src/PasswordHandler/index.js');

var args = process.argv.slice(2);
var helpLine = "QzQueryTools exec.js\n" +
    "====================\n" +
    "Used by specifying the following commands:\n" +
    "prepare\t To prepare freshly cloned git. Run this command after clone / install\n" +
    "fprepare\t Prepare without checking, overwrite existing config\n" +
    "decrypt\t Decrypt all connection password\n" +
    "encrypt\t Encrypt all connection password\n" +
    "reencrypt\t Change key and re-encrypt all connection password\n" +
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
            if(canPrepare()){
                prepare();                
            }
        }
        else if(command == "fprepare"){
            prepare();
        }
        else if(command == "decrypt"){
            decrypt();
        }
        else if(command == "encrypt"){
            decrypt();
            encrypt();
        }
        else if(command == "reencrypt"){
            reencrypt();
        }
        else{
            console.log(helpLine);
        }
    }
};

var canPrepare = function(){
    console.log("Checking if can prepare...");
    var folder = path.join(__dirname, "server/storage/config");
    if(fs.existsSync(path.join(folder, "config.js"))){
        console.log("Config already exists, use fprepare command instead");
        return false;
    }
    return true;
};
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
};

var encrypt = function(){
    console.log("Trying to encrypt connection...");
    var folder = path.join(__dirname, "server/storage/config");
    var connectionPath = path.join(folder, 'connections.js');
    var connectionObjs = JSON5.parse(fs.readFileSync(connectionPath, 'utf8'));
    var configObj = JSON5.parse(fs.readFileSync(path.join(folder, 'config.js'), 'utf8'));
    var encrypt = PasswordHandler(configObj.key).encrypt;
    for(var i = 0; i < connectionObjs.length; i++){
        connectionObjs[i].password = encrypt(connectionObjs[i].password);
    }
    fs.writeFileSync(path.join(folder, "connections.js"), 
        JSON.stringify(connectionObjs, null, 4), 
        "utf8");
    console.log("Encrypt connection done");
};
var decrypt = function(){
    console.log("Trying to decrypt connection...");
    var folder = path.join(__dirname, "server/storage/config");
    var connectionPath = path.join(folder, 'connections.js');
    var connectionObjs = JSON5.parse(fs.readFileSync(connectionPath, 'utf8'));
    var configObj = JSON5.parse(fs.readFileSync(path.join(folder, 'config.js'), 'utf8'));
    var decrypt = PasswordHandler(configObj.key).decrypt;
    for(var i = 0; i < connectionObjs.length; i++){
        var decrypted = decrypt(connectionObjs[i].password);
        if(decrypted){
            connectionObjs[i].password = decrypted;
        }
    }
    fs.writeFileSync(path.join(folder, "connections.js"), 
        JSON.stringify(connectionObjs, null, 4), 
        "utf8");

    console.log("Decrypt connection done");
};
var reencrypt = function(){
    var folder = path.join(__dirname, "server/storage/config");
    decrypt();
    console.log("Changing config key done");
    var configPath = path.join(folder, "config.js");
    fs.readFile(configPath, "utf8", (err, data) => {
        var configObj = JSON5.parse(data);
        configObj.key = uuid().replace(/-/g, "");
        fs.writeFile(path.join(folder, "config.js"), 
            JSON.stringify(configObj, null, 4), 
            "utf8",
            (err) => {
                if(err){ reject(err); }
                else{
                    console.log("Copying config files done");
                    encrypt();
                }
            });
    });
};

exec(args);