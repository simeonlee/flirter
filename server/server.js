var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema, User;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var config = require('./config');


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

  userSchema.statics.findOrCreate = function(profile, cb) {
    var userObj = new this();
    this.findOne({_id: profile.id}, function(err, result) {
      if (!result) {
        userObj.username = profile.displayName;
        userObj.save(cb);
      } else {
        cb(err, result);
      }
    })
  }

  User = mongoose.model('User', userSchema);
});


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    // callbackURL: "http://www.example.com/auth/facebook/callback"
    callbackURL: "https://limitless-stream-28526.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

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
  var body = req.body;
  var user = new User({
    name: body.name,
    age: body.age,
    city: body.city,
    job: body.job,
    description: body.description,
    imageUrls: body.imageUrls,
    notes: body.notes,
    lastLocation: body.lastLocation,
    joinDate: Date.now(),
    minor: body.age < 18 ? true : false,
    meta: {
      likedSomeone: body.meta.likedSomeone,
      beenLiked: body.meta.beenLiked
    }
  });
  user.save(function(err) {
    if (err) return handleError(err);
    // saved
    console.log('User has been saved to database!');
  });
  // var connection = mongoose.createConnection('mongodb://localhost/flirter');
  // var User = connection.model('User', userSchema);
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

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = app;