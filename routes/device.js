var express = require('express');
var router = express.Router();
var sqlconn = require('../lib/mysql').getConn();
const http = require('http');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    sqlconn.query(
      'SELECT deviceID, deviceName, deviceDesc, deviceType FROM tblDevices;',
      function(err, rows) {
        if (err) {
          console.log('Error while reading device list' + err);
        } else {
          res.send(rows);
        }
      });
  } else {
    res.sendStatus(401);
  }
});

router.post('/:deviceID', function(req, res, next) {
  if (req.isAuthenticated()) {
    var deviceID = req.params.deviceID;
    sqlconn.query(
      'SELECT * FROM tblPermissions WHERE deviceID = ' + deviceID + ' AND uid = ' + req.user.uid + ';',
      function(err, rows) {
        if (err) {
          res.sendStatus(500);
        } else if (!req.body.action) {
          res.sendStatus(400);
        } else if (rows.length < 1) {
          res.sendStatus(403);
        } else {
          sqlconn.query(
            'SELECT * FROM tblDevices WHERE deviceID = ' + deviceID,
            function(err, rows) {
              if (err) {
                res.sendStatus(500);
              } else {
                switch (rows[0].deviceType) {
                  case 1: //NUKI
                    if (req.body.action == "lock") {
                      sqlconn.query("INSERT INTO `mas`.`tblLogs` (`action`, `uid`, `deviceID`, `logCategory`) VALUES ('LOCK', '" + req.user.uid + "', '" + deviceID + "', '1');");
                      http.get('http://' + rows[0].deviceIP + ':8080/lock?token=' + rows[0].deviceSecret + '&nukiId=' + rows[0].vendorID);
                      res.sendStatus(200);
                    } else if (req.body.action == "unlock") {
                      sqlconn.query("INSERT INTO `mas`.`tblLogs` (`action`, `uid`, `deviceID`, `logCategory`) VALUES ('UNLOCK', '" + req.user.uid + "', '" + deviceID + "', '1');");
                      http.get('http://' + rows[0].deviceIP + ':8080/unlock?token=' + rows[0].deviceSecret + '&nukiId=' + rows[0].vendorID);
                      res.sendStatus(200);
                    } else {
                      res.sendStatus(400);
                    }
                    break;

                  case 2:

                    break;

                  default:
                    res.sendStatus(400);
                }
              }
            }
          );
        }
      }
    )
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
