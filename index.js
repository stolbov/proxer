var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

var Proxy = require('./proxy');

var port = 80;

app.get('*', function (req, res) {
  Proxy(req, res, 'get');
});

app.post('*', function (req, res) {
  Proxy(req, res, 'post');
});

app.listen(port, function () {
  console.log('App listening on port', port);
});
