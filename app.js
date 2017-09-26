var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Setting up mongoose 
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var db = mongoose.connect("mongodb://localhost/Cybros",{useMongoClient: true});

// routes to static and functional pages
var index = require('./routes/index');
var signup = require('./routes/signup');

var app = express();



// view engine setup --using handelbars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set path ! Needs to be asked to  
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/')));

app.use('/', index);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
