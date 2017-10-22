var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express(); 
var sess = {};

// User Schema imported 
var User = require("./../models/User");


//Make this secret key more complex to have better encryption
app.use(session({
    secret: 'CybrosIsHere',
    resave: true,
    saveUninitialized: false
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* GET Signup page. */
router.get('/', function(req, res) {
    sess=req.session;
    //console.log(sess.user);
    if(sess.user) {
      res.render('signup.hbs', {user : sess.user});
    }
    else {
      res.render('signup.hbs', {user:{username:"New User"}});
    }
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
                            res.status(500).send({error:err});
                            console.log("Could not save register user");
                        }
                        else{
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
    if(!sess.user){
        // Checking username from current database 
        User.find({username:req.body.username},function(err,user){
            if(err){
                res.status(500).send({error:"Could not get to Database"});
                console.log("Could get to database");
            }
            else{
                if (user.length!== 0) {
                    if(user[0].username){
                        console.log(req.body);
                        console.log(user);
                        if(user[0].Password == req.body.password){
                            //Successful sign in
                            req.session.user = user[0];
                            res.redirect('/');                        
                        }  
                        else{
                            res.render('signup.hbs', {
                                user:{username:"New User"},
                                login:"Username or password wrong, try again."
                            });
                        }               
                    }                                 
                }
                else{
                    res.render('signup.hbs', {
                        user:{username:"New User"},
                        login:"Username or password wrong, try again."
                    });
                } 
            }
        });
    }
    else{
        res.render('signup.hbs', {
            user : sess.user,
            login : "You have to log out first"
        }); 
    }         
});

router.get('/logout', function(req, res, next) {
    sess=req.session;
    if(sess.user) {
      req.session.destroy();
      res.redirect("/");
    }
    else {
          res.render('signup.hbs', {user:{username:"New User"}, login : "You have to sign in first. !"});
    }
  });

module.exports = router;