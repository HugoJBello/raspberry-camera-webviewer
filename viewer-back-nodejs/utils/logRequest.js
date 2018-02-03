var mysql = require('mysql');
var con = require('../mysql_connection/connection');


logRequest = (req) => {
  try{
    var userIp = req.ip;
    var userUrl = req.url;
  } catch (err) {
    var userIp = "unknown IP";
    var userUrl = "unknown id";
  }
  var sqlSelect = 'insert into log (date_added, request_ip,request_url) values (sysdate(), "' + userIp + '" , "' + userUrl + '");';
  con.query(sqlSelect, (err, result, fields) => {
    console.log(err);
    if(err) throw err;
  });
}

module.exports = logRequest;