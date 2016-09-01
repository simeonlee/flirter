var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var userModel = require('../db/users/userModel');
var authConfig = require('./authConfig');

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
  
  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: authConfig.scope }));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/#/map' }),
    function(req, res) {
      res.redirect('/#/map');
    });
}
