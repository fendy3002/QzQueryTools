var assert = require('assert');
var queryReader = require('../server/src/QueryReader/index.js').default;
var fs = require('fs');
var path = require('path');

describe('QueryReader', function() {
	describe('Read example query', function() {
		it('should output expected json', function(done) {
			var configPath = path.join(__dirname, "../server/storage/config/queries/.script.example");
		    fs.readFile(configPath, "utf8", function (err, data){
				var config = queryReader(data);

				var expected = {
					head: { 
						name: 'test.txt',
     					description: 'testing sql query',
     					params: { name: 'varchar', id: 'int', list: '%' },
     					availableTo: [ 'mysql' ] },
					script: data,
					labels: [ 
						{ label: 'SELECT 1', index: '1' },
     					{ label: 'SELECT 2', index: '2' }
     				]
				};

				assert.deepEqual(expected, config);
				done();
		    });
		});
	});
});
