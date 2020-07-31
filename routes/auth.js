var express = require('express');
var router = express.Router();
var sqlconn = require('../lib/mysql').getConn();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    passReqToCallback : true
  },
  function(req, username, password, done) {
    sqlconn.query("SELECT * FROM `tblUsers` WHERE `username` = '" + username + "'",function(err,rows){
      if (err){
        console.log(err);
        return done(err);
      }
      if (!rows.length) {
        return done(null, false);
      }

      // if the user is found but the password is wrong
      if (!( rows[0].password == password)){
        return done(null, false);
      }
        // all is well, return successful user
        return done(null, rows[0]);
      });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  sqlconn.query("select * from tblUsers where id = "+id,function(err,rows){
    done(err, rows[0]);
  });
});

router.post('/dologin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.send({successful: false}) }
    console.log(info);
    if (!user) { return res.send({successful: false}); }
    req.logIn(user, function(err) {
      if (err) { return res.send({successful: false}); }
      return res.send({successful: true});
    });
  })(req, res, next);
});

router.get('/', function(req, res, next) {
  var authState =  {
    isAuthenticated: req.isAuthenticated(),
  };
  res.send(authState);
});

router.get('/me', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  }
  else {
    res.sendStatus(401);
  }
});

module.exports = router;