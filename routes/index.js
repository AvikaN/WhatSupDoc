var express = require('express'),
	router = express.Router(),
	passport = require('passport'), 
	mongoose = require('mongoose'); 

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
	console.log(firstName);
	console.log(lastName);
	console.log(email);
	console.log(password);

	res.send("your information was received");

});

module.exports = router;