var listenPort = 8081;

var express = require('express');
var connect = require('body-parser');
var app = express();

app.use(connect.json());
app.use(connect.urlencoded({ extended: true }));

var Datastore = require('nedb');
var db = new Datastore({ filename: 'datastore.db', autoload: true });

app.use(express.static('public'));

app.get('/items', function (req, res) {
    db.find( {}, function(err, docs) {
        res.send(JSON.stringify(docs));
    });
});

app.post('/add', function (req, res) {
    var taskText = req.body.task;
    var complete =  req.body.complete;
    
    db.insert( { task: taskText, complete: complete}, function(err, newDoc) {
        res.send(JSON.stringify({ id: newDoc._id })); 
    });
});

app.post('/remove', function(req, res) {
    db.remove({ _id: req.body._id }, function(err, numRemoved) {
       res.send({ ok: 'ok'}); 
    });
});

app.listen(listenPort, function () {
    console.log('Example app listening on port ' + listenPort);
});