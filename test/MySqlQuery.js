var assert = require('assert');
var MySqlQuery = require('../server/src/MySqlQuery/index.js').default;

describe('MySqlQuery', function() {
	describe('Test execute', function() {
		it('result count should be 3', function(done) {
			var query = {
			   	"fileName": "script.example",
			   	"filePath": "script.example",
			   	"fullPath": "",
			   	"head": {
			      	"name": "test.txt",
			      	"description": "testing sql query",
			      	"params": {
			         	"name": "varchar",
			         	"id": "int",
			         	"list": "%"
			      	},
			      	"availableTo": [
			         	"mysql"
			      	]
			   	},
			   	"script": "/*<head>{\n\tname: \"test.txt\",\n\tdescription: \"testing sql query\",\n\tparams: {\n\t\t\"name\" : \"varchar\",\n\t\t\"id\" : \"int\",\n\t\t\"list\" : \"%\"\n\t},\n\tavailableTo: [\"mysql\"]\n}<\/head>*/\n\n-- <1:SELECT 1>\nSELECT 1 as `col1`  UNION ALL SELECT 2 as `col1`;\n\n-- <2:SELECT 2>\nSELECT @id as `col2`;\n\n-- <SELECT 3>\nSELECT @name as `col3`;",
			   	"labels": [
			    	{ label: 'SELECT 1', index: 1 },
				  	{ label: 'SELECT 2', index: 2 },
				  	{ label: 'SELECT 3', index: 3 }
				]
			};

			var connection = {
				"name" : "local dev",
				"driver" : "mysql",
				"port" : "3306",
				"host" : "localhost",
				"db" : "test",
				"username" : "root",
				"password" : "password"
			};
			
			MySqlQuery(connection, query, {id: "hello"}, (result) => {
				assert.equal(3, result.length);
				assert.equal(2, result[0].data.length);
				assert.equal(1, result[1].data.length);
				done();
			});
		});
	});
});
