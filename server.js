var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://okcoders:okcoders@okcoders.co/grant');		
mongoose.Promise = Promise;								

var app = express();
app.use(bodyParser());									
app.use(express.static('./public'));					

var port = process.env.PORT || 8080;
app.listen(8080, function() {
	console.log('Listening at http://localhost:'+port);
});

var Contact = require('./models/contact');						
var Kind = require('./models/kind');

app.get('/contacts', function(req,res) {					
	Contact.find().populate('kind').exec().then(function(contacts) {		
		res.json(contacts);			
	});
});

app.post('/contacts', function(req,res) {			
	var contact = req.body;							
	if(contact._id) {								
		Contact.findOneAndUpdate({_id:contact._id}, contact).exec().then(function() {	
			res.json(true);						
		});
	} else {									
		var newContact = new Contact(contact);				
		newContact.save().then(function() {			
			res.json(true);						
		});
	} 
});

app.delete('/contacts/:id', function(req,res) {
	var id = req.params.id;
	Contact.findOneAndRemove({_id:id}).exec().then(function() {
		res.json(true);
	});
});

function initKind() {
	return Kind.count().then(function(count) {
		if(count) return;

		var kinds = [
			{name: 'Buiness'},
			{name: 'Family'},
			{name: 'Friend'},
		];
		kinds.forEach(function(kind) {
			kind = new Kind(kind);
			return kind.save();
		});
	});
}

initKind();

app.get('/kinds', function(req,res) {
	Kind.find().populate('kind').exec().then(function(kinds) {
		res.json(kinds);
	});
});
















