var userModel = require('../db/users/userModel');
var passport = require('passport');

module.exports = function(app) {
  // get info about self
  app.get('/self', function(req, res) {
    userModel.User.findOne({_id: userModel.userId}, function(err, user) {
      res.send(user);
    })
  });

  // get all users
  app.get('/users', function(req, res) {
    console.log('/users hit');
    userModel.User.find(function(err, users) {
      res.send(users);
    });
  });

  // create a new user
  app.post('/users', function(req, res) {
  });

  // find user by id
  app.get('/users/:id', function(req, res) {
  });

  // update user by id
  app.put('/users/:id', function(req, res) {
    console.log('---> We\'ve found user!')
    console.log('---> Attempting to save stuff to database');
    console.log(req.body);
    userModel.User.findById(req.body._id, function(err, user) {
      if (err) {
        console.log(err);
        return;
      };
      user.notes.push(req.body.message);
      user.save(function(err) {
        if (err) {
          console.log(err);
          return;
        };
        console.log('---> We\'ve saved stuff to database!');
        res.send(user);
      })
    })
  });

  // delete user by id
  app.delete('/users/:id', function(req, res) {
  });

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook', passport.authenticate('facebook', { scope:
    [
      'email', 
      'user_likes', 
      'user_friends', 
      'user_photos', 
      'user_birthday',
      'user_location',
      'user_education_history',
      'user_events',
      'user_photos',
      'user_website',
      'user_tagged_places',
      'user_work_history'
    ]
  }));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/#/map' }),
    function(req, res) {
      res.redirect('/#/map');
    });
};