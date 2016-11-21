var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	mongoose = require('mongoose'), 
  User = mongoose.model('User');

router.get('/', function(req, res, next) {
      res.render('index');
});

router.get('/login', function(req, res, next){
	res.render('login');
});

router.post('/login', function(req, res, next){
    	passport.authenticate('local', function(err, user){ 
       		if(user){
       			req.logIn(user, function(err){
       				res.redirect('/dashboard');
       			});
       		}
       		else{
            res.render('error')
       			//res.render('login', {unsuccesful: true});
       		}
       	})(req, res, next);
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
                	if(err.name === "UserExistsError"){
                		res.render('login', {register:true});
                	}
                  else{
                    res.render("error, couldn't register");
                  }
                } else {
                    passport.authenticate('local')(req, res, function() {
                        res.render('successfuly registered');
					});
                }
			});

});

// router.get('/dashboard', function(req,res,next){
//     res.render('dashboard');
// });

module.exports = router;
