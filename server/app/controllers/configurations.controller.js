var devJson = require('../../config/development-conf.json')
    prodJson = require('../../config/production-conf.json');

exports.send = function(req, res) {
  if (process.env.NODE_ENV === 'development') {
    res.send(devJson);
  } else {
    res.send(prodJson);
  }
}
