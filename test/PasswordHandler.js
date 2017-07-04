var assert = require('assert');
var PasswordHandler = require('../server/src/PasswordHandler/index.js');

describe('PasswordHandler', function() {
	describe('Test encrypt decrypt', function() {
		it('should resulting the same', function() {
			var key = "SomeRandomKey";
			var toEncrypt = "SomeRandomStringYouKnow";
			var encrypted = PasswordHandler(key).encrypt(toEncrypt);
			var decrypted = PasswordHandler(key).decrypt(encrypted);
			assert.equal(toEncrypt, decrypted);
		});
	});
});
