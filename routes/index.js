var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', {});
});
router.get('/about', function(req, res, next) {
  res.render('about.hbs', {});
});
router.get('/classes', function(req, res, next) {
  res.render('classes.hbs', {});
});
router.get('/competition', function(req, res, next) {
  res.render('competition.hbs', {});
});
router.get('/workshops', function(req, res, next) {
  res.render('index.hbs', {});
});
router.get('/signup', function(req, res, next) {
  res.render('signup.hbs', {});
});
module.exports = router;
