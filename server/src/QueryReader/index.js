import fileReader from './fileReader.js';
import fs from 'fs';
import path from 'path';

var reader = function(folder){
	var files = fs.readdirSync(folder);
	var result = [];
	for(var i = 0; i < files.length; i++){
		var file = files[i];
		if(file.startsWith('.')){ continue; }
		var fullpath = path.join(folder, file);
		result.push({
			fileName: file,
			filePath: file,
			fullPath: path.join(folder, file),
			...fileReader(fs.readFileSync(fullpath, "utf8"))
		});
	}
	return result;
};

export default reader;