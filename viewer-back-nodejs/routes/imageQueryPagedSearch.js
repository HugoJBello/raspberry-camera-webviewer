var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = require('../mysql_connection/connection');
var config = require('../config/config');
var logRequest = require('../utils/logRequest');

const entriesPerPage=10;


router.get('/images_base64_paged_files/page=:page', function(req, res) {
  logRequest(req);
  if(req.params.page){
    var limit = entriesPerPage;
    var offset = entriesPerPage*(req.params.page-1);
    con.query('SELECT * FROM image order by date_taken desc limit ' +offset + ',' + limit, function (err, result, fields) {
      if (err) throw err;
      var response = result;
      res.json(response);
    });
 } else {
   res.json(null); 
 }
});

router.get('/images_base64_date_paged_files/day=:day/page=:page', function(req, res) {
  logRequest(req);
  if((req.params.day!==undefined) && (req.params.page!==undefined)){
    var limit = entriesPerPage;
    var offset = entriesPerPage*(req.params.page-1);
    con.query('SELECT * FROM image where date_taken LIKE  "'+ req.params.day +'%" order by date_taken desc limit ' +offset + ',' + limit, function (err, result, fields) {
      if (err) throw err;
      var response = result;
      res.json(response);
    });
 } else {
   res.json(null);
 }
});

router.get('/images_base64_parameters_date/day=:day', function(req, res) { 
  logRequest(req);
  con.query('SELECT count(*) FROM image where date_taken LIKE "'+ req.params.day + '%"', function (err, result, fields) {
    if (err) throw err;    
    response={};
    response.numberOfPages = Math.floor(result[0]['count(*)']/entriesPerPage)+1;
    response.numberOfItems = result[0]['count(*)'];
    response.entriesPerPage = entriesPerPage;
    res.json(response);
  });
});

router.get('/images_base64_parameters/', function(req, res) { 
  logRequest(req);
  con.query('SELECT count(*) FROM image', function (err, result, fields) {
    response={};
    response.numberOfPages = Math.floor(result[0]['count(*)']/entriesPerPage)+1;
    response.numberOfItems = result[0]['count(*)'];
    response.entriesPerPage = entriesPerPage;
    res.json(response);
  });
});

router.get('/active_cameras', function(req, res) { 
  logRequest(req);
  con.query('SELECT * FROM camera', function (err, result, fields) {
    res.json(result);
  });
});

module.exports = router;
