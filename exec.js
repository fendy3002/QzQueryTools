const fs = require('fs');
const path = require('path');

var args = process.argv.slice(2);
var helpLine = "QzQueryTools exec.js\n" +
    "====================\n" +
    "Used by specifying the following commands:\n" +
    "prepare\t To prepare freshly cloned git. Run this command after clone / install\n" +
    "help\t To show this page";
if(args.length == 0){
    console.log(helpLine);
}
else{
    var command = args[0];
    if(command == "help"){
        console.log(helpLine);
    }
    else if(command == "prepare"){
        console.log("Copying config files...\n");
        var folder = path.join(__dirname, "server/storage/config");
        var exampleQuery = fs.createReadStream(path.join(folder, 'queries', '.script.example'));
        var actualQuery = fs.createWriteStream(path.join(folder, 'queries', 'script.example'));

        exampleQuery.pipe(actualQuery);
        exampleQuery.on('end', () => {
            var exampleCon = fs.createReadStream(path.join(folder, 'connections.js.example'));
            var actualCon = fs.createWriteStream(path.join(folder, 'connections.js'));
            exampleCon.pipe(actualCon);
            exampleCon.on('end', () => {
                console.log("Copying config files done...\n");
            });
        });
    }
    else{
        console.log(helpLine);
    }
}