var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
const config = require('config');

// Setting up session store
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(config.get('dbConfig'));

// Setting up routes
var indexRouter = require('./routes/index');

// Setting up express
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../maker-access-system-frontend/build'));

// Setting up session for express
app.use(session({
  secret: config.get('systemConfig.sessionSecret'),
  store: sessionStore,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

//Respond to all unknown Routes with React, in case the routes are from the Frontend
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../maker-access-system-frontend/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
