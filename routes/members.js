var express = require('express');
var router = express.Router();
var sqlconn = require('../lib/mysql').getConn();
const http = require('http');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    var query = "";
    if (req.user.level > 1) {
      query = "SELECT * FROM tblUsers;";
    }
    else {
      query = "SELECT `Firstname`, `Lastname`, `Mail` FROM tblUsers;";
    }
    sqlconn.query(
      query,
      function(err, rows) {
        if (err) {
          console.log('Error while reading member list' + err);
        } else {
          res.send(rows);
        }
      });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
