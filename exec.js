const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');
const JSON5 = require('JSON5');

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

var prepare = function(){
    console.log("Copying connection and query files...\n");
    var folder = path.join(__dirname, "server/storage/config");
    var exampleQuery = fs.createReadStream(path.join(folder, 'queries', '.script.example'));
    var actualQuery = fs.createWriteStream(path.join(folder, 'queries', 'script.example'));

    exampleQuery.pipe(actualQuery);
    exampleQuery.on('end', () => {
        var exampleCon = fs.createReadStream(path.join(folder, 'connections.js.example'));
        var actualCon = fs.createWriteStream(path.join(folder, 'connections.js'));
        exampleCon.pipe(actualCon);
        exampleCon.on('end', () => {
            console.log("Copying connection and query files done...\n");
        });
    });

    console.log("Copying config files...\n");
    var appConfig = fs.readFile(path.join(folder, "config.js.example"), "utf8", (err, data) => {
        var configObj = JSON5.parse(data);
        configObj.key = uuid().replace(/-/g, "");
        fs.writeFile(path.join(folder, "config.js"), 
            JSON.stringify(configObj, null, 4), 
            "utf8");
        console.log("Copying config files done...\n");
    });
};


exec(args);