var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
// User Schema imported 
var User = require("./../models/User");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res) {
    res.render('signup.hbs', {});
});
router.post('/new_User', function(req, res) {
    var user = new User();
    user.Name = req.body.username;
    user.Email = req.body.email;
    user.Password = req.body.password;
    user.Repassword = req.body.repassword;
    user.save(function(err, registeredUser){
        if(err){
            res.status(500).send({error:"Could not save register user"});
            console.log("Could not save register user");
        }
        else{
            res.send(registeredUser);
            console.log('! A user registered: Username: ' + req.body.username + ', Password: ' + req.body.password+', Email: ' + req.body.email);            
        }
    });
});
module.exports = router;
