var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

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
  res.render('workshops.hbs', {});
});
module.exports = router;
