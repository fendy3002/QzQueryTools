var JSON5 = require('json5');

var reader = function(query){
	var headPattern = /\s*<head>([^]*)<\/head>\s*/;
	var queryPattern = /<Q i=[0-9]*>([^]*)<\/Q>/g;
/*
	var regexMatch = headPattern.exec(query);
	if(!regexMatch || regexMatch.length < 2){
		return null;
	}
	var headRaw = regexMatch[1];
	var head = null;
	try{
		head = JSON5.parse(headRaw);
	}
	catch(ex){
		head = {
			"error": "Unable to parse JSON"
		};
	}
	*/
	var queryRegex = queryPattern.exec(query);
	var labels = [];
	var ord = 1;
	
	while (queryRegex != null) {
		console.log("queryRegex" + ord, queryRegex);
		
		queryRegex = queryPattern.exec(query);
		ord++;
	}
	return {
		head: head,
		script: query,
		labels: labels
	};
};

export default reader;