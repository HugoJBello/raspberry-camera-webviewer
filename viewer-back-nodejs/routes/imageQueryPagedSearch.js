var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var con = require('../mysql_connection/connection');
const checkJwt = require('../auth/checkJwt');

const entriesPerPage=10;

router.get('/images_base64_paged_files/page=:page',checkJwt, function(req, res) {
  if(req.params.page){
    var limit = entriesPerPage;
    var offset = entriesPerPage*(req.params.page-1);
    con.query('SELECT * FROM image order by date_taken desc limit ' +offset + ',' + limit, function (err, result, fields) {
      if (err) throw err;
      for (var i=0;i<result.length;i++){
        //result[i].base64 = base64_encode(result[i].path);
      }
      var response = result;
      res.json(response);
    });
 } else {
   res.json(null); 
 }
});

router.get('/images_base64_date_paged_files/day=:day/page=:page',checkJwt, function(req, res) {
 if((req.params.day!==undefined) && (req.params.page!==undefined)){
    var limit = entriesPerPage;
    var offset = entriesPerPage*(req.params.page-1);
    console.log(offset);
    con.query('SELECT * FROM image where date_taken LIKE  "'+ req.params.day +'%" order by date_taken desc limit ' +offset + ',' + limit, function (err, result, fields) {
      if (err) throw err;
      for (var i=0;i<result.length;i++){
        //result[i].base64 = base64_encode(result[i].path);
      }
      var response = result;
      res.json(response);
      console.log(response); 
    });
 } else {
   res.json(null);
 }
});

router.get('/images_base64_parameters_date/day=:day',checkJwt, function(req, res) { 
  con.query('SELECT count(*) FROM image where date_taken LIKE "'+ req.params.day + '%"', function (err, result, fields) {
    if (err) throw err;    
    response={};
    response.numberOfPages = Math.floor(result[0]['count(*)']/entriesPerPage)+1;
    response.numberOfItems = result[0]['count(*)'];
    response.entriesPerPage = entriesPerPage;
    res.json(response);
  });
});

router.get('/images_base64_parameters/',checkJwt, function(req, res) { 
  con.query('SELECT count(*) FROM image', function (err, result, fields) {
    response={};
    response.numberOfPages = Math.floor(result[0]['count(*)']/entriesPerPage)+1;
    response.numberOfItems = result[0]['count(*)'];
    response.entriesPerPage = entriesPerPage;
    res.json(response);
  });
});

// function to encode file data to base64 encoded string
function base64_encode(file) {
  try {
    // read binary data
    var bitmap = fs.readFileSync(file); 
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
  } catch (err) {
    return null;
  }
}

module.exports = router;
