import fileReader from './fileReader.js';
import fs from 'fs';
import path from 'path';

var reader = function(folder, callback){	
	getFile(folder, '').then(result => {
		callback(result);
	}).catch(function (err) {
		console.log(err);
	});
};

var resolveLink = (filePath, attr) => {
	return new Promise(resolve => {
		fs.readFile(filePath, "utf8", (err, data) => {
			var destinationFolder = data.replace(/(\n|\r)+$/, '');
			getFile(destinationFolder, attr.file + "/").then(children => {
				if(children.length > 0){
					resolve({
						fileName: attr.file,
						filePath: attr.file,
						fullPath: destinationFolder,
						children: children
					});
				}
				else{
					resolve(null);
				}
			});
		});
	});
};

var resolveFileOrFolder = (filepath, attr) => {
	return new Promise(resolve => {
		fs.lstat(filepath, (err, stats) => {
			if(stats.isDirectory()){
				var childPrefix = attr.prefix + attr.file + "/";
				getFile(filepath, childPrefix).then(children => {
					if(children.length > 0){
						resolve({
							children: children,
							...attr
						});
					}
					else{
						resolve(null);
					}
				});
			}
			else{
				resolveFile(filepath, attr).then(fileModel => {
					resolve(fileModel);
				});
			}
		});
	});
};

var resolveFile = (filepath, attr) => {
	return new Promise(resolve => {
		fs.readFile(filepath, "utf8", (err, data) => {
			fileReader(data, (config) => {
				resolve({
					...attr,
					...config
				});
			});
		});
	});
};

var readDir = function(folder){
	return new Promise(resolve => {
		fs.readdir(folder, function (err, files) {
			resolve(files);
		});
	});
};

var getFile = async function(folder, prefix){
	var result = [];
	var files = await readDir(folder);
	for(var i = 0; i < files.length; i++){
		var file = files[i];

		if(file.startsWith('.')){ continue; }
		
		var attr = {
			fileName: file,
			filePath: prefix + file,
			fullPath: path.join(folder, file)
		};

		if(file.endsWith(".link")) {
			var linkModel = await resolveLink(attr.fullPath, attr);
			if(linkModel){
				result.push(linkModel);
			}
		}
		else{
			var fileOrFolderModel = await resolveFileOrFolder(attr.fullPath, attr);
			if(fileOrFolderModel){
				result.push(fileOrFolderModel);
			}
		}
	}
	return result;
}

export default reader;