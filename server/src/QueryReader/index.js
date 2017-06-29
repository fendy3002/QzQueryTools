var JSON5 = require('json5');

var reader = function(query){
	var headPattern = /\/\*\s*<head>([^]*)<\/head>\s*\*\//;
	var labelPattern = /--<(.*?):(.*?)>/g;

	var headRaw = query.match(headPattern)[1];
	var head = JSON5.parse(headRaw);
	var labelsRegex = labelPattern.exec(query);
	var labels = [];
	while (labelsRegex != null) {
		labels.push({
			label: labelsRegex[2],
			index: labelsRegex[1]
		});
		labelsRegex = labelPattern.exec(query);
	}
	
	return {
		head: head,
		script: query,
		labels: labels
	};
};

export default reader;