/*
To use/test admin panel in your local machine you have to insert an admin data mannually in mongoDB
and make sure you make "HasAccess" set to "true" as it is "false" by default
*/ 

var express = require('express');
var router = express.Router();
var sess = {};

// Admin schema imported
var Admin = require("./../models/Admin");
// Event schema imported
var Event = require("./../models/Event");


/* GET Signup page. */
router.get('/', function(req, res) {
    sess = req.session;
    if(sess.admin) {
        res.render('adminlogin.hbs', {user : sess.admin});
      }
      else {
        res.render('adminlogin.hbs', {user : {username:"New admin"}});
      }  
});

router.post('/login', function(req, res) {
    sess = req.session;
    if(!sess.admin){
        // Checking username from current database 
        Admin.find({username:req.body.username},function(err,admin){
            if(err){
                res.status(500).send({error:"Could not get to Database"});
                console.log("Could get to database");
            }
            else{
                if (admin[0].length!== 0) {
                    if(admin[0].username){
                        console.log(req.body);
                        console.log(admin);
                        if(admin[0].Password == req.body.password){
                            //Successful sign in
                            req.session.admin = admin[0];
                            res.render('adminpanel.hbs', {
                                user :admin[0]
                            });                       
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
            user : sess.admin,
            login : "You have to log out first"
        }); 
    }   
});

router.get('/addevent', function(req, res) {
    sess = req.session;
    if(sess.admin) {
        res.render('addevent.hbs', {user : sess.admin});
      }
      else {
        res.render('adminlogin.hbs', {user : {username:"New admin"},login:"You need to log in first. !"});
      }  
});

router.post('/addevent_submit', function(req, res) {
    sess = req.session;
    if(sess.admin) {
        Event.find({Event_ID:req.body.ID},function(err,event){
            if(err){
                res.status(500).send({error:err});
                console.log(err);
            }
            else{
                if (event.length!=0) {
                    if(event[0].Event_ID){
                        console.log("Event ID already exist username:"+event[0].Event_ID);
                        res.render('addevent.hbs', {
                            user : sess.admin,
                            emessage:"Event ID already exist, try again"
                        });                      
                    }                                 
                }
                else{
                    var event = new Event();
                    event.Event_ID = req.body.ID;
                    event.Event_Name = req.body.Name;
                    event.Event_Type = req.body.eventType;
                    event.Event_Description = req.body.Description;
                    event.Venue= req.body.Venue;
                    event.Date = req.body.Date;
                    event.Time = req.body.Time;
                    event.Fee = req.body.Fee;
                    event.Additional_Links = req.body.Additional;
                    // Saving new event to database
                    event.save(function(err, newEvent){
                        if(err){
                            res.status(500).send({error:err});
                            console.log("Could not add event.");
                        }
                        else{
                            res.render('adminpanel.hbs', {user : sess.admin, eventMessage : "Event created!"});
                            console.log('! An event created: \n' + newEvent);            
                        }
                    });
                }
            }
        });    
    }
    else {
        res.render('adminlogin.hbs', {user : {username:"New admin"},login:"You need to log in first. !"});
      }  
});

router.get('/editevent', function(req, res) {
    sess = req.session;
    if(sess.admin) {
        res.render('editevent.hbs', {user : sess.admin});
      }
      else {
        res.render('adminlogin.hbs', {user : {username:"New admin"},login:"You need to log in first. !"});
      }  
});
var holdID;
router.post('/editevent/search', function(req, res) {
    sess = req.session;
    if(sess.admin) {
        Event.find({Event_ID:req.body.srcheventID},function(err,event){
            if(err){
                res.status(500).send({error:err});
                console.log(err);
            }
            else{
                if (event.length!=0) {
                    if(event[0].Event_ID){
                        console.log("Event found :"+event[0]);
                        holdID = event[0]._id;
                        res.render('editevent.hbs', {
                            user : sess.admin,
                            event: event[0],
                            emessage:"Event found. You can edit now.",
                        });                      
                    }                                 
                }
                else{
                    res.render('editevent.hbs', {
                        user : sess.admin,
                        emessage:"Event not found. Try again.",
                    });  
                }
            }
        });
      }
      else {
        res.render('adminlogin.hbs', {user : {username:"New admin"},login:"You need to log in first. !"});
      }  
});

router.post('/editevent_submit', function(req, res, next) {
    sess=req.session;
    if(sess.admin) {
        Event.findOneAndUpdate({_id: holdID}, {$set:{
            Event_Name:req.body.Name,
            Event_Type:req.body.eventType,
            Event_Description:req.body.Description,
            Venue:req.body.Venue,
            Date:req.body.Date,
            Time:req.body.Time,
            Fee:req.body.Fee,
            Additional_Links:req.body.Additional,
          }}, {new: true}, function(err, event){
            if(!err){
                 res.render('adminpanel.hbs', {user : sess.admin, eventMessage : "Event details updated. !"});
            }
            else{
              res.status(500).send({error:"Error, can't access Database!"});
            }
        });    
    }
    else {
      res.render('adminpanel.hbs', {user : {username:"New admin"}, login : "You have to log in first. !"});
    }
    
  });

  router.get('/deleteevent', function(req, res) {
    sess = req.session;
    if(sess.admin) {
        res.render('deleteEvent.hbs', {user : sess.admin});
      }
      else {
        res.render('adminlogin.hbs', {user : {username:"New admin"},login:"You need to log in first. !"});
      }  
});

  router.post('/deleteevent/delete', function(req, res) {
    sess = req.session;
    if(sess.admin) {
        Event.find({Event_ID:req.body.srcheventID},function(err,event){
            if(err){
                res.status(500).send({error:err});
                console.log(err);
            }
            else{
                if (event.length!=0) {
                    if(event[0].Event_ID){
                        Event.findOneAndRemove({Event_ID:req.body.srcheventID},function (err,event){
                            console.log("Event deleted ID:"+req.body.srcheventID);
                            res.render('adminpanel.hbs', {
                                user : sess.admin,
                                eventMessage:"Event Deleted, ID:"+req.body.srcheventID,
                            });
                        });                        
                    }                                 
                }
                else{
                    res.render('deleteEvent.hbs', {
                        user : sess.admin,
                        emessage:"Event not found. Try again.",
                        displaysubmit : false
                    });  
                }
            }
        });
      }
      else {
        res.render('adminlogin.hbs', {user : {username:"New admin"},login:"You need to log in first. !"});
      }  
});

router.get('/logout', function(req, res, next) {
    sess=req.session;
    if(sess.admin) {
      req.session.destroy();
      res.render('adminlogin.hbs', {user : {username:"New admin"}, login : "Successfully logged out."});
    }
    else {
          res.render('adminlogin.hbs', {user : {username:"New admin"}, login : "You have to sign in first. !"});
    }
});
module.exports = router;
