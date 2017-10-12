var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var sess = {};


//User schema imported
var User = require("./../models/User");
//Event schema imported
var Event = require("./../models/Event");

//Make this secret key more complex to have better encryption
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
  Event.find({},function(err,event){
    if(err){
        res.status(500).send({error:err});
        console.log("Could get to database");
    }
    else{
        if (event.length!== 0) {
                console.log(event);
                if(sess.user) {
                  res.render('index.hbs', {
                    user : sess.user.username,
                    event : event
                  });
                }
                else {
                  res.render('index.hbs', {user : "New user", event : event});
                }                                    
        }
        else{
          console.log("No events featured");
        }
    }
});
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
  Event.find({Event_Type:"Class"},function(err,event){
    if(err){
        res.status(500).send({error:err});
        console.log("Could get to database");
    }
    else{
        if (event.length!== 0) {
                console.log(event);
                if(sess.user) {
                  res.render('classes.hbs', {
                    user : sess.user.username,
                    event : event
                  });
                }
                else {
                  res.render('classes.hbs', {user : "New user", event : event});
                }
        }
        else{
          console.log("No Classes featured");
        }
    }
});

  
});

/* GET competition page. */
router.get('/competition', function(req, res, next) {
  sess=req.session;
  Event.find({Event_Type:"Competition"},function(err,event){
    if(err){
        res.status(500).send({error:err});
        console.log("Could get to database");
    }
    else{
        if (event.length!== 0) {
                console.log(event);
                if(sess.user) {
                  res.render('competition.hbs', {
                    user : sess.user.username,
                    event : event
                  });
                }
                else {
                  res.render('competition.hbs', {user : "New user", event : event});
                }
        }
        else{
          console.log("No competitions featured");
        }
    }
});
});

/* GET workshops page. */
router.get('/workshops', function(req, res, next) {
  sess=req.session;
  Event.find({Event_Type:"Workshop"},function(err,event){
    if(err){
        res.status(500).send({error:err});
        console.log("Could get to database");
    }
    else{
        if (event.length!== 0) {
                console.log(event);
                if(sess.user) {
                  res.render('workshops.hbs', {
                    user : sess.user.username,
                    event : event,
                  });
              }
                else {
                  res.render('workshops.hbs', {user : "New user", event : event,});
                }
        }
        else{
          console.log("No workshops featured");
        }
    }
  });
});

router.get('/profile', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    res.render('profile.hbs', {user : sess.user});
  }
  else {
        res.render('signup.hbs', {user : "New user", login : "You have to sign in first. !"});
  }
});


router.post('/update', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    User.findOneAndUpdate({username: sess.user.username}, {$set:{
      Name:req.body.Name,
      Email:req.body.Email,
      Phone:req.body.Phone,
      Password:req.body.Password,
      Age:req.body.Age,
      Gender:req.body.Gender,
      Address:req.body.Address,
      Institute_or_Company:req.body.Institute_or_Company,
    }}, {new: true}, function(err, user){
      if(!err){
        req.session.user = user;
        sess = req.session;
        res.render('profile.hbs', {user : sess.user, pmessage : "Details updated. !"});
      }
      else{
        res.status(500).send({error:"Error, can't access Database!"});
      }
    });
  }
  else {
    res.render('signup.hbs', {user : "New user", login : "You have to sign in first. !"});
  }
  
});



router.get('/event', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    res.render('event.hbs', {user : sess.user.event});
  }
  else {
        res.render('signup.hbs', {user : "New user", login : "You have to sign in first. !"});
  }
});

module.exports = router;