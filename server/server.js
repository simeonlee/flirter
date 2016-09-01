var express = require('express');
var mongoose = require('mongoose');

var mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost/flirter';
mongoose.connect(mongooseUri);

var app = express();

require('./config/middleware.js')(app, express);
require('./auth/auth.js')(app);
require('./config/routes.js')(app);

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log('App is running on port ' + port);
});

module.exports = app;