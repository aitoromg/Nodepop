var createError = require('http-errors');
var express = require('express');
var i18n = require('i18n');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

i18n.configure({
  locales:['en', 'es'],
  directory: __dirname + '/locales'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.use(i18n.init);

// Mongoose connect & models
require('./lib/connectMongoose');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Nodepop';

/**
 * API Routes
 */

app.use('/apiv1/ads', require('./routes/apiv1/ads'));
app.use('/apiv1/users', require('./routes/apiv1/users'));
app.use('/apiv1/tags', require('./routes/apiv1/tags'));

/**
 * Web app routes
 */

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0]; 
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }
  res.status(err.status || 500);

  // if API request answer with JSON
  if(isAPI(req)){
    res.json({success: false, error: err.message});
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function isAPI(req){
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
