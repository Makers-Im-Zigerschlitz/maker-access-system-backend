var express = require('express');
var router = express.Router();
var sqlconn = require('../lib/mysql').getConn();
var passport = require('passport');

var authRouter = require('./auth');
var deviceRouter = require('./device');
var memberRouter = require('./members');
router.use('/auth', authRouter);
router.use('/device', deviceRouter);
router.use('/members', memberRouter);

module.exports = router;
