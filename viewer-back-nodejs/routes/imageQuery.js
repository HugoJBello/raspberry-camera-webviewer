var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var checkJwt = require('../auth/checkJwt');
var con = require('../mysql_connection/connection');
var config = require('../config/config');
var logRequest = require('../utils/logRequest');

router.get('/get_list_images/:limit', function (req, res, next) {
  logRequest(req);
  con.query("SELECT * FROM image order by date_taken desc limit " + req.params.limit, function (err, result, fields) {
    if (err) {
      console.log(err);
      console.log("error in mysql");
    };
    res.json(result);
  });
});

router.get('/images_base64_date/limit=:limit/skip=:skip/day=:day', function (req, res) {
  logRequest(req);
  if (req.params.limit && req.params.day) {
    con.query('SELECT * FROM image where date_taken LIKE "' + req.params.day + '%" order by date_taken desc limit ' + req.params.limit + " OFFSET " + req.params.skip, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  } else {
    res.json(null);
  }
});



router.get('/get_list_images_cam/:limit/:cameraId', function (req, res, next) {
  logRequest(req);
  con.query("SELECT * FROM image where camera_id = '" + req.param.cameraId + "' order by date_taken desc limit " + req.params.limit, function (err, result, fields) {
    if (err) {
      console.log(err);
      console.log("error in mysql");
    };
    res.json(result);
  });
});

router.get('/images_base64_cam_date/limit=:limit/skip=:skip/day=:day', function (req, res) {
  logRequest(req);
  if (req.params.limit && req.params.day) {
    con.query('SELECT * FROM image where camera_id= "' + req.param.cameraId + '" AND date_taken LIKE "' + req.params.day + '%" order by date_taken desc limit ' + req.params.limit + " OFFSET " + req.params.skip, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  } else {
    res.json(null);
  }
});

module.exports = router;