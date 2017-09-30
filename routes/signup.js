var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

/* 1st Note for KARAN sir : I am  using a global variable to store user details for a session*/ 
profile = {};

// User Schema imported 
var User = require("./../models/User");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res) {
    res.render('signup.hbs', {});
});
//
router.post('/new_User', function(req, res) {
    // Unique user validation
    var userlist = [];
    User.find({username:req.body.username},function(err,user){
        if(err){
            res.status(500).send({error:"Could not get to Database"});
            console.log("Could get to database");
        }
        else{
            if (user.length!=0) {
                if(user[0].username){
                    console.log("Username already exist username:"+user[0].username);
                    res.render('signup.hbs', {
                        signup:"Username already exist, try again"
                    });                      
                }                                 
            }
            else{
                //Password validation
                if(req.body.password == req.body.repassword){
                    var user = new User();
                    user.username = req.body.username;
                    user.Email = req.body.email;
                    user.Password = req.body.password;
                    user.save(function(err, registeredUser){
                        if(err){
                            res.status(500).send({error:"Could not save register user"});
                            console.log("Could not save register user");
                        }
                        else{
                            res.send(registeredUser);
                            console.log('! A user registered: Username:: ' + req.body.username + ', Password: ' + req.body.password+', Email: ' + req.body.email);            
                        }
                    });
                } 
                else {
                    res.render('signup.hbs', {
                        signup:"Password do not match, try again."
                    });
                }
            }             
        }
    });         
});

// User sign in
router.post('/login', function(req, res) {
    // Unique user validation
    var userlist = [];
    User.find({username:req.body.username},function(err,user){
        if(err){
            res.status(500).send({error:"Could not get to Database"});
            console.log("Could get to database");
        }
        else{
            if (user.length!=0) {
                if(user[0].username){
                    console.log(req.body);
                    console.log(user);
                    if(user[0].Password == req.body.password){
                        //Successful sign in
                        res.send(user);
                        /*2nd Note for KARAN sir : Here assigning user's details to that global variable*/
                        profile = user[0];
                    }  
                    else{
                        res.render('signup.hbs', {
                            login:"Username or password wrong, try again."
                        });
                    }               
                }                                 
            } 
        }
    });         
});

module.exports = router;