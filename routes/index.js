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
  console.log(profile);
  /*3rd Note for KARAN sir : I need to access that userdata here and pass it to handelbars template*/
  res.render('index.hbs', { user : profile.username});
});
router.get('/about', function(req, res, next) {
  res.render('about.hbs', { user : profile.username});
});
router.get('/classes', function(req, res, next) {
  res.render('classes.hbs', { user : profile.username});
});
router.get('/competition', function(req, res, next) {
  res.render('competition.hbs', { user : profile.username});
});
router.get('/workshops', function(req, res, next) {
  res.render('workshops.hbs', { user : profile.username});
});

/*4th Note for KARAN sir : So currently its working with global variable but I want to know 
if there is any alternative for that I also tried passing it through module.exports but still
it was not working*/

module.exports = router;
