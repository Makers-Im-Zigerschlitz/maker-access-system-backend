exports.getConn = function() {
  var mysql = require('mysql');
  const config = require('config');

  var con = mysql.createConnection(config.get('dbConfig'));
  con.connect();
  return con;
}
