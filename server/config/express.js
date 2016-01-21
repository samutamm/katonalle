var express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser');

module.exports = function() {
  var app = express();
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if(process.env.NODE_ENV === 'production') {
    app.use(compression()); //to zip response bodies
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  require('../app/routes/configurations.route.js')(app);

  app.use(express.static('public'));
  return app;
}
