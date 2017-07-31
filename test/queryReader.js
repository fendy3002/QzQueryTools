var assert = require('assert');
var queryReader = require('../server/src/QueryReader/fileReader.js').default;
var queryFolderReader = require('../server/src/QueryReader/index.js').default;
var fs = require('fs');
var path = require('path');

describe('QueryReader', function() {
	describe('Read example query file', function() {
		it('should output expected json', function(done) {
			var configPath = path.join(__dirname, "../config/queries/.script.example");
		    fs.readFile(configPath, "utf8", function (err, data){
				var config = queryReader(data, config => {
					var expected = {
						head: {
							description: 'Testing sql query',
							params: { name: 'varchar', id: 'int', list: '%' },
							availableTo: [ 'mysql' ] },
						script: data,
						labels: [ 
							{ label: 'SELECT 1', index: '1' },
							{ label: 'SELECT 2', index: '2' },
							{ label: 'SELECT 3', index: '3' }
						],
						queries: [
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
								"script": "\nSET @newName = CONCAT(@name, ' Skywalker');\nSELECT @name as `col3`, @newName as `newName`;\n"
							}
						]
					};
					assert.deepEqual(expected.head, config.head);
					assert.deepEqual(expected.queries, config.queries);
					assert.deepEqual(expected.labels, config.labels);
					done();
				});
		    });
		});
	});
	describe('Read query folders', function() {
		it('should read queries folder including link', function(done) {
			var folder = path.join(__dirname, "../config/queries");
			var employeeFolder = path.join(folder, "employees");
			var oldFile2 = fs.createReadStream(path.join(folder, 'employees', '.get_employees_info.sql'));
			var newFile2 = fs.createWriteStream(path.join(folder, 'employees','get_employees_info.sql'));

			var expectedFilePaths = [
				"employee.link",
				"employees",
				"script.example"
			];
			oldFile2.pipe(newFile2);
			oldFile2.on("end", () => {
				fs.writeFile(path.join(folder, "/employee.link"), employeeFolder, (err) => {
					queryFolderReader(folder, (result) => {
						// only 3 query must be present
						assert.equal(3, result.length);
						result.forEach(query => {
							// the topmost queries must between the excpected file paths
							assert.equal(true, 
								expectedFilePaths.indexOf(query.filePath) !== false);
							if(query.filePath == 'employee.link'){
								// employee.link must have 1 children
								assert.equal(1, query.children.length);
							}
						});

						fs.unlink(path.join(folder, 'employees', 'get_employees_info.sql'));
						fs.unlink(path.join(folder, 'employee.link'));
						done();
					});
				});
			});
		});
	});
});
