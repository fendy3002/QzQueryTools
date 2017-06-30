import fileReader from './fileReader.js';
import fs from 'fs';
import path from 'path';

var reader = function(folder){
	var result = getFile(folder, '');
	return result;
};

var getFile = function(folder, prefix){
	var files = fs.readdirSync(folder);
	var result = [];
	for(var i = 0; i < files.length; i++){
		var file = files[i];
		if(file.startsWith('.')){ continue; }
		var fullpath = path.join(folder, file);
		if(fs.lstatSync(fullpath).isDirectory()){
			var children = getFile(path.join(folder, file), prefix + file + "/");
			if(children.length > 0){
				result.push({
					fileName: file,
					filePath: prefix + file,
					fullPath: path.join(folder, file),
					children: children
				});
			}
		}
		else{
			result.push({
			fileName: file,
			filePath: prefix + file,
			fullPath: path.join(folder, file),
				...fileReader(fs.readFileSync(fullpath, "utf8"))
			});
		}
	}
	return result;
}

export default reader;