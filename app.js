var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
require('./db');
require('./auth');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//set up session
var session = require('express-session');
var sessionOptions = {
  secret: 'secret cookie thang (store this elsewhwere!)',
  resave: true,
  saveUninitialized: true
};



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// make req.user avaliable in every context
app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

var routes = require('./routes/index');
app.use('/', routes);


// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
