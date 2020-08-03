var bcrypt = require('bcrypt');
const config = require('config');
var salt = config.get('systemConfig.passwordSalt');
