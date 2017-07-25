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
				var config = queryReader(data);

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
     				]
				};
				assert.deepEqual(expected, config);
				done();
		    });
		});
	});
	describe('Read query folders', function() {
		it('should output queries from folder', function(done) {
			var folder = path.join(__dirname, "../config/queries");
			var oldFile2 = fs.createReadStream(path.join(folder, 'employees', '.get_employees_by_name.sql'));
			var newFile2 = fs.createWriteStream(path.join(folder, 'employees','get_employees_by_name.sql'));
			oldFile2.pipe(newFile2);
			oldFile2.on("end", () => {
				var result = queryFolderReader(folder, folder);
				assert.equal(2, result.length);
				fs.unlink(path.join(folder, 'employees', 'get_employees_by_name.sql'));
				done();
			});
		});
	});
});
