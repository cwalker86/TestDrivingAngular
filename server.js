var express = require('express');

// Invoke Express
var app = express();

// List of Objects with names
var contacts = [{
	name:"Chris"
},{
	name:"Erin"
},{
	name:"Cyrus"
}];

// Respond 200 with the contacts list per 'get' request
app.get('/contacts',function(req, res){
	res.status(200).json(contacts);
});

// Listen on Port 9001
app.listen(9001);