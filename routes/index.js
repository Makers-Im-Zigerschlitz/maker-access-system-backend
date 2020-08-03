var express = require('express');
var router = express.Router();
var sqlconn = require('../lib/mysql').getConn();
var passport = require('passport');

var authRouter = require('./auth');
router.use('/auth', authRouter);

module.exports = router;
