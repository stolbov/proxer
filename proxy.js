var request = require('request');
var http = require('http');

var options = {};

try {
  options = require('./options');
} catch (e) {
  console.error('*** Congiguration file is not exist! ***');
}

var host = options.host;
var tokenPath = options.tokenPath;
var params = options.params;

module.exports = function (req, res, method) {
  var queryPref = '?';
  var form;
  var path = req.originalUrl;
  request.post({
    url: host + tokenPath,
    form: params
    },
    function (error, response, body) {
    // console.log(error, body);
      if (error || response.statusCode !== 200) {
        return res.sendStatus(500);
      } else {
        var tokenInfo = JSON.parse(body);
        var token = tokenInfo.token;
        if (path.indexOf('?') + 1) {
          queryPref = '&';
        }

        if (!method || method == 'get') {
          // console.log(host + path + queryPref + 'token=' + token);
          request
            .get(host + path + queryPref + 'token=' + token)
            .pipe(res)
          ;
        } else {
          form = req.body;
          form.token = token
          request
            .post(host + path)
            .form(req.body)
            .pipe(res)
          ;
        }
      }
    }
  );
};
