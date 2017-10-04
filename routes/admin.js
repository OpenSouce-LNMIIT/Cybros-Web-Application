/*
To use/test admin panel in your local machine you have to insert an admin data mannually in mongoDB
and make sure you make "HasAccess" set to "true" as it is "false" by default
*/ 

var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express(); 
var sess = {};

//Admin schema imported
var Admin = require("./../models/Admin");

//Make this secret key more complex to have better encryption
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
    sess = req.session;
    if(sess.admin) {
        res.render('adminlogin.hbs', {user : sess.admin.username});
      }
      else {
        res.render('adminlogin.hbs', {user : "New admin"});
      }  
});

router.post('/login', function(req, res) {
    sess = req.session;
    if(!sess.user){
        // Checking username from current database 
        Admin.find({username:req.body.username},function(err,admin){
            if(err){
                res.status(500).send({error:"Could not get to Database"});
                console.log("Could get to database");
            }
            else{
                if (admin.length!== 0) {
                    if(admin[0].username){
                        console.log(req.body);
                        console.log(admin);
                        if(admin[0].Password == req.body.password){
                            //Successful sign in
                            req.session.admin = admin[0];
                            res.send(admin[0]);                        
                        }  
                        else{
                            res.render('adminlogin.hbs', {
                                user :"New admin",
                                login:"Username or password wrong, try again."
                            });
                        }               
                    }                                 
                }
                else{
                    res.render('adminlogin.hbs', {
                        user :"New admin",
                        login:"Username or password wrong, try again."
                    });
                } 
            }
        });
    }
    else{
        res.render('adminlogin.hbs', {
            user : sess.admin.username,
            login : "You have to log out first"
        }); 
    }   
});

router.get('/logout', function(req, res, next) {
    sess=req.session;
    if(sess.admin) {
      req.session.destroy();
      res.render('adminlogin.hbs', {user : "New admin"});
    }
    else {
          res.render('adminlogin.hbs', {user : "New admin", login : "You have to sign in first. !"});
    }
});
module.exports = router;