var mongoose = require('mongoose');

var Contact = mongoose.model('Contact', {
	kind: {type:mongoose.Schema.Types.ObjectId, ref:'Kind'},
	firstName: String,	
	lastName: String,
	phoneNum: Number,
	address: String,
	email:  String,
	comment: String
});

module.exports = Contact;	