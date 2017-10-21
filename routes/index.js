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
//Registrations schema imported
var Registrations = require("./../models/Registrations");

//Make this secret key more complex to have better encryption
app.use(session({
  secret: 'cybros@LNMIIT_ComputerClub_101',
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

                //console.log(sess.user);
                if(sess.user) {
                  res.render('index.hbs', {
                    user : sess.user,
                    event : event
                  });
                }
                else {
                  res.render('index.hbs', {user :{username:"New User"}, event : event});

                }                                    
        }
        else if(sess.user){
          res.render('index.hbs', {user :sess.user, event : null});
          console.log("No events featured");
        }else{
          
          res.render('index.hbs', {user :{username :"New User"}, event : null});
        }
    }
});
});

// GET event page
router.get('/event/:id', function(req, res, next) {
  sess=req.session;
  console.log(req.params.id);
  Event.find({Event_ID : req.params.id},function(err,event){
    if(err){
        res.status(500).send({error:err});
        console.log("Could get to database");
    }
    else{
        if (event.length!== 0) {
                console.log(event[0]);
                if(sess.user) {
                  res.render('event.hbs', {
                    user : sess.user,
                    event : event[0]
                  });
                }
                else {
                  res.render('event.hbs', {user :{username:"New User"}, event : event[0]});
                }                                    
        }
        else if(sess.user){
          res.render('index.hbs', {user :sess.user, event : null});
          console.log("No events featured");
        }else{
          
          res.render('index.hbs', {user :{username :"New User"}, event : null});
        }
    }
});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  sess=req.session;
  if(sess.user) {
    res.render('about.hbs', {user : sess.user});
  }
  else {
        res.render('about.hbs', {user :{username:"New User"}});
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
                    user : sess.user,
                    event : event
                  });
                }
                else {
                  res.render('classes.hbs', {user :{username:"New User"}, event : event});
                }
        }
        else if(sess.user){
          res.render('classes.hbs', {user :sess.user, event : null});
          console.log("No classes featured");
        }else{
          
          res.render('classes.hbs', {user :{username :"New User"}, event : null});
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
                    user : sess.user,
                    event : event
                  });
                }
                else {
                  res.render('competition.hbs', {user :{username:"New User"}, event : event});
                }
        }
        else if(sess.user){
          res.render('competition.hbs', {user :sess.user, event : null});
          console.log("No competitions featured");
        }else{
          
          res.render('competition.hbs', {user :{username :"New User"}, event : null});
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
                    user : sess.user,
                    event : event,
                  });
              }
                else {
                  res.render('workshops.hbs', {user :{username:"New User"}, event : event,});
                }
        }
        else if(sess.user){
          res.render('workshops.hbs', {user :sess.user, event : null});
          console.log("No events featured");
        }else{
          
          res.render('workshops.hbs', {user :{username :"New User"}, event : null});
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
        res.render('signup.hbs', {user :{username:"New User"}, login : "You have to sign in first. !"});
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
    res.render('signup.hbs', {user :{username:"New User"}, login : "You have to sign in first. !"});
  }
  
});




//Register user in event
router.post('/register', function(req, res) {
  sess=req.session;
  if(sess.user) {
  // Unique user validation
  Registrations.find({event : req.body.objid, user:sess.user._id},function(err,reg){
      if(err){
          res.status(500).send({error:err});
          console.log("Could get to database");
      }
      else{
          if (reg.length!=0) {
              if(reg[0].user[0].username){
                  console.log("User already registered:"+reg[0].user[0].username);
                  res.render('index.hbs', {
                      user: sess.user,
                      rmessage:"You already registered for "+req.body.Event_Name
                  });                      
              }                                 
          }
          else{
              //Saving data in Registrations
                  var registered = new Registrations({event:req.body.objid, user:sess.user._id });
                  registered.save(function(err, registeredUser){
                      if(err){
                          res.status(500).send({error:err});
                          console.log("Could not register user");
                      }
                      else{
			  res.redirect('/');
                          console.log(registered.username+" registred for "+req.body.Event_Name);            
                      }
                  });
          }             
      }
  });
}
else {
      res.render('signup.hbs', {user :{username:"New User"}, login : "You have to sign in first. !"});
}         
});



module.exports = router;
