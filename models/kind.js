var mongoose = require('mongoose');

var Kind = mongoose.model('Kind', {		
	name: String
});

module.exports = Kind;