var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('admin:admin@ds127101.mlab.com:27101/workoutrecord', ['workoutrecord']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/workouts', function(req, res) {
	console.log("I received a GET request");
	db.workoutrecord.find().sort({"created": -1}, function (err, docs) {
		console.log(docs);
		res.json(docs)
	});
});

app.post('/workouts', function(req, res) {
	console.log(req.body);
	db.workoutrecord.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/workouts/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.workoutrecord.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/workouts/:id', function(req, res) {
	var id = req.params.id;
	db.workoutrecord.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/workouts/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.workoutrecord.findAndModify({query: {_id: mongojs.ObjectId(id)},
	update: {$set: {date: req.body.date,
					part: req.body.part,
					name: req.body.name}},
			new: true}, function (err, doc) {
				res.json(doc);
	});
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('listening on ' + port);