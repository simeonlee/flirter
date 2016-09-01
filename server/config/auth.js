var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var userModel = require('../db/users/userModel');

module.exports = function(app) {
  app.use(session({
    secret: 'flirting secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      // callbackURL: "http://www.example.com/auth/facebook/callback"
      callbackURL: "https://limitless-stream-28526.herokuapp.com/auth/facebook/callback",
      // https://developers.facebook.com/docs/graph-api/reference/v2.5/user
      profileFields: [
        'id', 
        'displayName', 
        'first_name', 
        'last_name', 
        'email', 
        'bio', 
        'work',
        'education', 
        'location', 
        'birthday', 
        'cover', 
        'photos', 
        'gender', 
        'interested_in', 
        'link', // FB timeline 
        'website', 
        'is_verified'
      ]
    },
    function(accessToken, refreshToken, profile, done) {
      userModel.User.findOrCreate(profile, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}
