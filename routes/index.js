var express = require('express'),
	router = express.Router(),
	passport = require('passport'), 
	mongoose = require('mongoose'); 

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index');
});

module.exports = router;