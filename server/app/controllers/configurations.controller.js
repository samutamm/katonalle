var confJson = require('../../config/configurations.json');

exports.send = function(req, res) {
  res.send(confJson);
}
