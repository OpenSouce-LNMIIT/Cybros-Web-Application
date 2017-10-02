var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var sess = {};

app.use(session({
  secret: 'cybros',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/* GET index page. */
router.get('/', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    res.render('index.hbs', {user : sess.user.username});
  }
  else {
    res.render('index.hbs', {});
  }
  
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  sess=req.session;
  if(sess.username) {
    res.render('about.hbs', {user : sess.user.username});
  }
  else {
        res.render('about.hbs');
  }
  
});

/* GET classes page. */
router.get('/classes', function(req, res, next) {
  sess=req.session;
  if(sess.username) {
    res.render('classes.hbs', {user : sess.user.username});
  }
  else {
        res.render('classes.hbs');
  }
});

/* GET competition page. */
router.get('/competition', function(req, res, next) {
  sess=req.session;
  if(sess.username) {
    res.render('competition.hbs', {user : sess.user.username});
  }
  else {
        res.render('competition.hbs');
  }
});

/* GET workshops page. */
router.get('/workshops', function(req, res, next) {
  sess=req.session;
  if(sess.username) {
    res.render('workshops.hbs', {user : sess.user.username});
  }
  else {
        res.render('workshops.hbs');
  }
});

module.exports = router;
