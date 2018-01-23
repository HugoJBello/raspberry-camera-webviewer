var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "norhug",
    password: "",
    database: "picam_app" 
  });

  module.exports = con;