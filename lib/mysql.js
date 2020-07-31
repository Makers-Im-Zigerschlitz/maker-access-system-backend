exports.getConn = function() {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "mas",
    password: "123456789",
    database: "mas"
  });
  con.connect();
  return con;
}
