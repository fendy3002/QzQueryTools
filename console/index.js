var crypto = require('./Crypto.js');
var prepare = require('./Prepare.js');

var Service = function(args, root){
    var helpLine = "QzQueryTools exec.js\n" +
        "====================\n" +
        "Used by specifying the following commands:\n" +
        "prepare\t To prepare freshly cloned git. Run this command after clone / install\n" +
        "fprepare\t Prepare without checking, overwrite existing config\n" +
        "decrypt\t Decrypt all connection password\n" +
        "encrypt\t Encrypt all connection password\n" +
        "reencrypt\t Change key and re-encrypt all connection password\n" +
        "help\t To show this page";

    var Prepare = prepare(root);
    var Crypto = crypto(root);
    if(args.length == 0){
        console.log(helpLine);
    }
    else{
        var command = args[0];
        if(command == "help"){
            console.log(helpLine);
        }
        else if(command == "prepare"){
            if(Prepare.canPrepare()){
                Prepare.prepare();                
            }
        }
        else if(command == "fprepare"){
            Prepare.prepare();
        }
        else if(command == "decrypt"){
            Crypto.decrypt();
        }
        else if(command == "encrypt"){
            Crypto.decrypt();
            Crypto.encrypt();
        }
        else if(command == "reencrypt"){
            Crypto.reencrypt();
        }
        else{
            console.log(helpLine);
        }
    }
};

module.exports = Service;