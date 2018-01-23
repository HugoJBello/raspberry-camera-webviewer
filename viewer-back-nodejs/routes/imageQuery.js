var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
const checkJwt = require('../auth/checkJwt');
var con = require('../mysql_connection/connection');

router.get('/get_list_images/:limit', checkJwt,function(req, res, next) {
    con.query("SELECT * FROM image order by date_taken desc limit " + req.params.limit, function (err, result, fields) {
      if (err) {
        console.log(err);
        console.log("error in mysql");
      };
      res.json(result);
    });
});


router.get('/images_base64_date/limit=:limit/skip=:skip/day=:day',checkJwt, function(req, res) {
    if(req.params.limit &&  req.params.day){
      con.query('SELECT * FROM image where date_taken LIKE "'+ req.params.day +'%" order by date_taken desc limit ' + req.params.limit + " OFFSET " + req.params.skip, function (err, result, fields) {
        if (err) throw err;
        for (var i=0;i<result.length;i++){
          result[i].base64 = base64_encode(result[i].path);
        }
        console.log(result);
        res.json(result);
      });
   } else {
     res.json(null);
   }
});

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