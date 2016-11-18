require( '../db' );
var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	mongoose = require('mongoose');

var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index');
});

router.get('/register', function(req, res, next){
	res.render('register');
});

router.post('/register', function(req, res, next){
	User.register(new User({
                username: req.body.email,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }), req.body.password, function(err, user) {
                if (err) {
                    res.send("an error occured");
                } else {
                    passport.authenticate('local')(req, res, function() {
                        res.send('new user was created, check mongo console to see if the new user was created');
					});
                }
			});

});

module.exports = router;
