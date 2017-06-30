var JSON5 = require('json5');

var reader = function(query){
	var headPattern = /\/\*\s*<head>([^]*)<\/head>\s*\*\//;
	var labelPattern = /--\s*<(.*?)>/g;

	var headRaw = query.match(headPattern)[1];
	var head = JSON5.parse(headRaw);
	var labelsRegex = labelPattern.exec(query);
	var labels = [];
	var ord = 1;
	while (labelsRegex != null) {
		if(labelsRegex[1].indexOf(":") > 0){
			labels.push({
				label: labelsRegex[1].split(':')[1],
				index: Number(labelsRegex[1].split(':')[0])
			});
		}
		else{
			labels.push({
				label: labelsRegex[1],
				index: ord
			});
		}
		
		labelsRegex = labelPattern.exec(query);
		ord++;
	}
	return {
		head: head,
		script: query,
		labels: labels
	};
};

export default reader;