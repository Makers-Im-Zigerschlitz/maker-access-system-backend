var express = require('express');
var router = express.Router();
var sqlconn = require('../lib/mysql').getConn();
var passport = require('passport');

var authRouter = require('./auth');
var deviceRouter = require('./device');
router.use('/auth', authRouter);
router.use('/device', deviceRouter);

module.exports = router;
