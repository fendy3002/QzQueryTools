var JSON5 = require('json5');
var xml2js = require('xml2js').parseString;
var lo = require("lodash");


var reader = function(query, callback){
	xml2js("<root>" + query + "</root>",  (err, result) => {
		var root = result.root;
		var head = {};
		try{
			head = JSON5.parse(root.head[0]);
		}
		catch(ex){
			head = {
				"error": "Unable to parse JSON"
			};
		}
		
		var script = "";
		var labels = [];
		var queries = [];
		lo.forEach(root.Q, q => {
			labels.push({
				label: q.$.label,
				index: q.$.i
			});
			queries.push({
				index: q.$.i,
				script: q._
			});
			script += q._ + "\n";
		});

		callback({
			head: head,
			labels: lo.sortBy(labels, k=> k.index),
			queries: lo.sortBy(queries, k=> k.index),
			script: script
		});
	});
};

export default reader;