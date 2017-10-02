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
    res.render('index.hbs', {user : "New user"});
  }
  
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    res.render('about.hbs', {user : sess.user.username});
  }
  else {
        res.render('about.hbs', {user : "New user"});
  }
  
});

/* GET classes page. */
router.get('/classes', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    res.render('classes.hbs', {user : sess.user.username});
  }
  else {
        res.render('classes.hbs', {user : "New user"});
  }
});

/* GET competition page. */
router.get('/competition', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    res.render('competition.hbs', {user : sess.user.username});
  }
  else {
        res.render('competition.hbs', {user : "New user"});
  }
});

/* GET workshops page. */
router.get('/workshops', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    res.render('workshops.hbs', {user : sess.user.username});
  }
  else {
        res.render('workshops.hbs', {user : "New user"});
  }
});

router.get('/profile', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    res.render('profile.hbs', {user : sess.user.username});
  }
  else {
        res.render('signup.hbs', {user : "New user", login : "! You have to sign in first."});
  }
});

router.get('/logout', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    req.session.destroy();
    res.render('index.hbs', {user : "New user"});
  }
  else {
        res.render('signup.hbs', {user : "New user", login : "! You have to sign in first."});
  }
});
module.exports = router;
