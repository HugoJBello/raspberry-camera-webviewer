var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var checkJwt = require('../auth/checkJwt');
var con = require('../mysql_connection/connection');
var config = require('../config/config');


router.get('/heat_map_data_date/day=:day', function (req, res) {
  if (req.params.day) {
    var sqlCount = 'SELECT count(*) from image where date_taken LIKE "' + req.params.day + '%";';
    var secondsForImage = 40;
    con.query(sqlCount, function (err, result, fields) {
      if (result) {
        var count = result[0]['count(*)'] * secondsForImage;
        var sqlSelect = 'SELECT * FROM image where date_taken LIKE "' + req.params.day + '%" order by date_taken desc';
        con.query(sqlSelect, function (err, result, fields) {
          if (err) throw err;
          var data = [];
          var details = [];
          for (var i = 0; i < result.length; i++) {
            var detail = {
              date: result[i].date_taken,
              name: result[i].camera_id,
              value: secondsForImage
            }
            details.push(detail);
          }
          var dataToday = {
            date: req.params.day,
            total: count,
            details: details
          }
          data.push(dataToday);
          console.log(data);
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