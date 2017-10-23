var express = require('express');
var router = express.Router();
var sess = {};

// User Schema imported 
var User = require("./../models/User");



//Setting up node mailer

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'YOUR-EMAIL-ID@gmail.com',
      pass: 'YOUR-PASSWORD'
    }
  });

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
                    jwt.sign({
                        username: req.body.username
                      }, 'CybrosIsHere', { expiresIn: '1h' },function(err,token){
                        var mailOptions = {
                            from: '"no-reply "YOUR-EMAIL-ID@gmail.com',
                            to: req.body.email,
                            subject: 'Cybros-Web-App activate account.',
                            html:
                            '<img src="https://github.com/Cybros/Cybros-Web-Application/blob/master/favicon.png"/><p><b>Hello</b>'+req.body.username+',</p>' +
                '<p>Click on the link to activate your account:<br/><a href="http://localhost:3000/confirmuser/'+token+'">ACTIVATE</a></p>'
                          };
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                              console.log(token);
                            }
                          }); 
                      });
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
                            var mailOptions = {
                                from: '"NO REPLY 👻"girichaitanya11@gmail.com',
                                to: req.body.email,
                                subject: 'Cybros user login credentials',
                                html: "<strong>Username</strong>:"+req.body.email+"<br><strong>Password</strong>:"+req.body.password+
                                "<br>You have signed up for <strong>Cybros.</strong><br>Note:To complete your profile go to profile section of Cybros website."
                              };
                              transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });
                            res.render('signup.hbs', {
                                login:"User registered. Activate your account through the email sent to you."
                            });
                            console.log('! A user registered: Username:: ' + registeredUser);            
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
    if(!sess.user){
        // Checking username from current database 
        User.find({username:req.body.username},function(err,user){
            if(err){
                res.status(500).send({error:"Could not get to Database"});
                console.log("Could get to database");
            }
            else{
                if (user.length!== 0) {
                    if(user[0].confirmed == true){
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
                    }else{
                        res.render('signup.hbs', {
                            user:{username:"New User"},
                            login:"Please activate your ID by clicking on the link of email."
                        });
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
