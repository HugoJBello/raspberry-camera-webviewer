var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var checkJwt = require('../auth/checkJwt');
var con = require('../mysql_connection/connection');


router.get('/image_recorded/:filename', function(req, res) { 
  con.query('SELECT * FROM image where filename =  "'+ req.params.filename+'" limit 1', function (err, result, fields) {
      if (err) throw err;    
      try {
        var file = result[0].path;
        // read binary data
        var bitmap = fs.readFileSync(file); 
        // convert binary data to base64 encoded string
        res.contentType('image/jpeg');
        res.end(bitmap,"binary");
      } catch (err) {
        return null;
      }      
    });
    
});

// function to encode file data to base64 encoded string
function base64_encode(file) {
    try{
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
    } catch (err) {
      return null;
    }
}

module.exports = router;