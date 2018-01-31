var mysql = require('mysql');
var config = require('../config/config');

var con = mysql.createConnection({
    connectionLimit : config.mysqlConnectionPullLimit, //important
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase 
  });

  module.exports = con;