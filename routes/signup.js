var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express(); 
var sess = {}

// User Schema imported 
var User = require("./../models/User");

app.use(session({
    secret: 'cybros',
    resave: true,
    saveUninitialized: false
  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* GET Signup page. */
router.get('/', function(req, res) {
    sess=req.session;
    res.render('signup.hbs', {});
});

// New User Signup 
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
                    // Saving new user to database
                    user.save(function(err, registeredUser){
                        if(err){
                            res.status(500).send({error:"Could not save register user"});
                            console.log("Could not save register user");
                        }
                        else{
                            res.send(registeredUser);
                            res.render('signup.hbs', {
                                login:"User registered. Login here to continue."
                            });
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
    sess=req.session;
    // Unique user validation
    var userlist = [];
    // Checking username from current database 
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
                        req.session.user = user[0];
                        res.render('index.hbs',{user:sess.user.username});                        
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