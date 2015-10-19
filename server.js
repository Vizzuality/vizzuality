'use strict';

var app = require('./app');
var server = app.listen(process.env.PORT || 8000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening  at http://%s:%s', host, port);
});
