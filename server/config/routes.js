var userModel = require('../db/users/userModel');

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
};