var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema, User;

mongoose.connect('mongodb://localhost/flirter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database is connected');

  userSchema = new Schema({
    name: String,
    age: Number,
    city: String,
    job: String,
    description: String,
    imageUrls: [ String ],
    notes: [
      {
        body: String,
        date: Date,
        location: String
      }
    ],
    lastLocation: String,
    joinDate: { type: Date, default: Date.now },

    // teens can chat with other teens, why not...
    // just use FB to verify ages
    minor: Boolean,
    meta: {
      likedSomeone: { type: Number, default: 0 },
      beenLiked: { type: Number, default: 0 }
    }
  });

  User = mongoose.model('User', userSchema);
});

// var ObjectID = mongodb.ObjectID;

// var USERS_COLLECTION = "users";

var app = express();
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

// put in global scope to allow usage by all route handlers
// var db;

// connect app and database
// mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
// 	if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   db = database;
//   console.log('Database is connected');

//   // initialize the application only after the db connection is ready
//   // ensures app won't crash or error out by trying database operations
//   // before the connection is established
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log('App is running on port ' + port);
});
// });

// get all users
app.get('/users', function(req, res) {
  console.log('/users hit');
  res.send(['blah']);
});

// create a new user
app.post('/users', function(req, res) {

});

// find user by id
app.get('/users/:id', function(req, res) {

});

// update user by id
app.put('/users/:id', function(req, res) {

});

// delete user by id
app.delete('/users/:id', function(req, res) {
  
});

