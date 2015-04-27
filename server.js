var app = require('./app');
var server = app.listen(process.env.PORT || 5000, function() {
  'use strict';
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening  at http://%s:%s', host, port);
});
