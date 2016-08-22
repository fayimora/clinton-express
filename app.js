var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var livereload = require('express-livereload');
var pg = require('pg');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var router = express.Router();
livereload(app, config={});

// var client = new pg.Client();

var pgConfig = {
  user: 'locusdev',
  password: 'locusdev',
  database: 'locus',
  port: '5432',
  max: 2,
  idleTimeoutMillis: 300000000
};

var pgPool = new pg.Pool(pgConfig);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);

// import the controller and invoke function that is required
var usersController = require('./controllers/users.controller');
app.get('/users', function (req, res, next) {
  usersController.list(req, res, next, pgPool);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
