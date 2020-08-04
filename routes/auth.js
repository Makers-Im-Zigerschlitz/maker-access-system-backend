var express = require('express');
var router = express.Router();
var sqlconn = require('../lib/mysql').getConn();
var bcrypt = require('bcryptjs');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    passReqToCallback : true
  },
  function(req, username, password, done) {
    sqlconn.query("SELECT * FROM `tblUsers` WHERE `username` = '" + username + "'",function(err,rows){
      if (err){
        return done(err);
      }
      if (!rows.length) {
        return done(null, false);
      }
      // if the user is found but the password is wrong
      // if (!( rows[0].password == password)){
      //   return done(null, false);
      // }
      if(!bcrypt.compareSync(password, rows[0].password)){
        return done(null, false);
      }
        // all is well, return successful user
        return done(null, rows[0]);
      });
}));

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  sqlconn.query("select * from tblUsers where uid = "+uid,function(err,rows){
    done(err, rows[0]);
  });
});

router.post('/dologin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.send({successful: false})}
    if (!user) { return res.send({successful: false});}
    req.logIn(user, function(err) {
      if (err) {
        return res.send({successful: false});
      }
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

router.post('/me/setpass', function(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.body.password) {
      var hash = bcrypt.hashSync(req.body.password, 8);
      sqlconn.query("UPDATE `tblUsers` SET `password` = '" + hash + "'WHERE `username` = '" + req.user.username + "'");
      res.sendStatus(200);
    }
    else {
      res.sendStatus(400);
    }
  }
  else {
    res.sendStatus(401);
  }
});

module.exports = router;
