var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var userModel = require('../db/users/userModel');
var authConfig = require('./authConfig');

module.exports = function(app) {
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://limitless-stream-28526.herokuapp.com/auth/facebook/callback",
      profileFields: authConfig.profileFields
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
