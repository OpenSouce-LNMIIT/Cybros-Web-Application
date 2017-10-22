var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//hbs stuff start
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

//https only
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

// Setting up mongoose
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var db = mongoose.connect("mongodb://localhost/Cybros",{useMongoClient: true});

// routes to static and functional pages
var index = require('./routes/index');
var signup = require('./routes/signup');
var admin = require('./routes/admin');

var app = express();

//app.listen(8000);

// view engine setup --using handelbars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// using express-sessions to manage session
app.use(session({
  secret: "CybrosIsHere",
  resave: true,
  saveUninitialized: false
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/')));

app.use('/', index);
app.use('/signup', signup);
app.use('/admin', admin);

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

//RegisterHelper for checking equality
//Use this to check equality..
//instead of {{#if}} use {{#ifCond}}
hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});


module.exports = app;
