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
			   	"script": `<head>{
						description: "Testing sql query",
						params: {
							"name" : "varchar",
							"id" : "int",
							"list" : "%"
						},
						availableTo: ["mysql"]
					}</head>

					<Q i="1" label="SELECT 1">
					SELECT 1 as col1 UNION ALL
					SELECT 2 as col1;
					</Q>

					<Q i="2" label="SELECT 2">
					SELECT @id as col2;
					</Q>

					<Q i="3" label="SELECT 3">
					SELECT @name as col3;
					</Q>`,
				"queries": [
					{
						"index": "1",
						"label": "SELECT 1",
						"script": "\nSELECT 1 as `col1` UNION ALL\nSELECT 2 as `col1`;\n"
					},
					{
						"index": "2",
						"label": "SELECT 2",
						"script": "\nSELECT @id as `col2`;\n"
					},
					{
						"index": "3",
						"label": "SELECT 3",
						"script": "\nSELECT @name as `col3`;\n"
					}
				],
			   	"labels": [
			    	{ label: 'SELECT 1', index: 1 },
				  	{ label: 'SELECT 2', index: 2 },
				  	{ label: 'SELECT 3', index: 3 }
				]
			};

			var connection = {
				"name" : "local dev",
				"driver" : "mysql",
				"port" : "3307",
				"host" : "127.0.0.1",
				"db" : "testdb",
				"username" : "root",
				"password" : "password"
			};
			
			MySqlQuery(connection, query, {id: "hello"}, (result) => {
				assert.equal(3, Object.keys(result.data).length);
				assert.equal(2, result.data[0].data.length);
				assert.equal(1, result.data[1].data.length);
				done();
			});
		});
	});
});
