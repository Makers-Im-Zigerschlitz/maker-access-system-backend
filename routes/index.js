var express = require('express');
var router = express.Router();
var sqlconn = require('../lib/mysql').getConn();
var passport = require('passport');

var authRouter = require('./auth');
router.use('/auth', authRouter);


router.get('/', function(req, res, next) {
      res.redirect("https://github.com/Makers-Im-Zigerschlitz/maker-access-system-backend");
});

module.exports = router;
