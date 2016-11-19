require( '../db' );
var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	mongoose = require('mongoose');

var User = mongoose.model('User');
var Survey = mongoose.model('Survey');

var defaultQuestions = [
    "How are you feeling?",
    "Pain level"
];

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};

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

router.get('/create-survey', function(req, res, next) {
    res.render('create-survey', {questions: defaultQuestions});
});

router.post('/create-survey', function(req, res, next) {
    // TODO make sure myInputs is an array, if not do something else...
    console.log(req.body);
    var qs = defaultQuestions;
    req.body.myInputs.forEach(function(current) {
        qs.push(current);
    });
    // TODO make sure it's a unique ID
    var rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };
    var token = rand() + rand();
    console.log(token);
    var survey = new Survey({
        id:token,
        questions:qs
    }).save(function(err, obj, count) {
        if (err) console.log(err);
        // TODO make sure
        res.redirect('survey/'+token);
    });
});

router.get('/survey/:surveyId', function(req, res, next) {
    Survey.findOne({'id':req.params.surveyId}, function(err, result, count) {
        console.log(result.questions);
        // TODO redirect to desired page (doctor profile or send survey page)vvvv
        res.render('patient-survey', {survey:result.questions});
    });
});


module.exports = router;
