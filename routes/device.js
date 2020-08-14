var express = require('express');
var router = express.Router();
var sqlconn = require('../lib/mysql').getConn();

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    sqlconn.query(
      'SELECT deviceID, deviceName, deviceDesc, deviceType FROM tblDevices;',
      function(err,rows){
        if(err){
          console.log('Error while reading device list' + err);
        }
        else {
          res.send(rows);
        }
      });
  }
  else {
    res.sendStatus(401);
  }
});

module.exports = router;
