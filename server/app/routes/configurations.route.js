var Configurations = require('../controllers/configurations.controller.js');

module.exports = function(app) {
  app.get('/configurations', Configurations.send);
}
