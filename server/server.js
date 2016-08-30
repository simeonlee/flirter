var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema;
var User;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var config = require('./config');

var mongooseUri =
   process.env.MONGODB_URI ||
   'mongodb://localhost/flirter'
mongoose.connect(mongooseUri);
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
        console.log(profile);
        userObj.name = profile.displayName;
        userObj.save(cb);
      } else {
        cb(err, result);
      }
    })
  }

  User = mongoose.model('User', userSchema);


  var app = express();
  app.use(express.static(__dirname + '/../client'));
  app.use(bodyParser.json());
  app.use(passport.initialize());

  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log('App is running on port ' + port);
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
    passport.authenticate('facebook', { successRedirect: '/#/map', failureRedirect: '/#/map' }));

  module.exports = app;
});