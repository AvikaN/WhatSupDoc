require( '../db' );
var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	mongoose = require('mongoose');

var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
	  console.log(req);
	  console.log(res);
      res.render('index');
});

router.get('/register', function(req, res, next){
	res.render('register');
});

router.post('/register', function(req, res, next){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var password = req.body.password;
    console.log("1");
	User.register(new User({
                username: email,
                email: email,
                firstName: firstName,
                lastName: lastName,
            }), req.body.password, function(err, user) {
                if (err) {
                    console.log(err);
                    console.log("2");
                    res.send("an error occured");
                } else {
					// TODO send email to newly registered user
                    console.log("3");
                    //req.session.user = user;
                    passport.authenticate('local')(req, res, function() {
                        res.send('new user was created, check mongo console to see if the new user was created');
                    	// TODO redirect to next page in onboarding after new doctor signs up
					});
                }
			});

});

module.exports = router;
