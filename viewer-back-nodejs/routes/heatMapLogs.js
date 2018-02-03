var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var checkJwt = require('../auth/checkJwt');
var con = require('../mysql_connection/connection');
var config = require('../config/config');


router.get('/heat_map_logs_date/day=:day', function (req, res) {
  if (req.params.day) {
    var sqlCount = 'SELECT count(*) from log where date_added LIKE "' + req.params.day + '%";';
    var valueForEachLog = 40;
    con.query(sqlCount, function (err, result, fields) {
      if (result) {
        var count = result[0]['count(*)'] * valueForEachLog;
        var sqlSelect = 'SELECT * FROM log where date_added LIKE "' + req.params.day + '%"';
        con.query(sqlSelect, function (err, result, fields) {
          if (err) throw err;
          var data = [];
          var details = [];
          for (var i = 0; i < result.length; i++) {
            var detail = {
              date: result[i].date_added,
              name: result[i].request_ip,
              value: valueForEachLog
            }
            details.push(detail);
          }
          var logsToday = {
            date: req.params.day,
            total: count,
            details: details
          }
          data.push(logsToday);
          console.log(logsToday);
          res.json(data);
        });
      } else {
        res.json(null);
      }
    });
  } else {
    res.json(null);
  }
});


module.exports = router;