var express = require('express');
var router = express.Router();
const fs = require('fs-extra')
var con = require('../mysql_connection/connection');
var config = require('../config/config');

var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === config.basicAuthUser && user.pass === config.basicAuthPassword) {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}
 

router.post("/save_new_shot", auth, function (req, res) {
  var basePath = config.destinyPath + "/" + formatDate(new Date);
  var destinyPath = basePath  + "/" + req.body.filename;
  try{
    var cameraIp = req.ip;
    var cameraId = req.body.camera_id;
  } catch (err) {
    var cameraIp = "unknown IP";
    var cameraId = "unknown id";
  }
  
  var sqlNewImage = 'insert into image (date_taken,path,filename,camera_id,camera_ip) values (sysdate(),"' + destinyPath + '","' + req.body.filename + '","' + cameraId+ '","' +cameraIp+ '");'
  var sqlNewCamera = 'insert into camera (camera_id,date_added) values ("' + cameraId+ '",sysdate());'
  var sqlSearchCamera = 'SELECT count(*) FROM camera where camera_id= "'+cameraId+'"';
  //first we check that the camera exist in the db
  con.query(sqlSearchCamera, function (err, result, fields) {
    if (err) throw err;
    if (result[0]['count(*)']=='0') {
      //if it does not exist we create it
      con.query(sqlNewCamera, function (err, result, fields) { 
        if (err) throw err;
      });
    }
    //now we add the image
    con.query(sqlNewImage, function (err, result, fields) {
      if (err) throw err;
    });
  });

  try{
    ensureExists(basePath).then(
      saveBase64Image(req.body.base64,destinyPath));
  } catch (err) {
    console.log(err)
  }
  
  res.send("received and saved correctly");
});

function saveBase64Image(textBase64,destinyPath) {
  try {
    base64Data  =   textBase64.replace(/^data:image\/png;base64,/, "");
    base64Data  +=  base64Data.replace('+', ' ');
    binaryData  =   new Buffer(base64Data, 'base64').toString('binary');

    fs.writeFile(destinyPath, binaryData, "binary", function (err) {
      console.log(err); 
    });
  } catch (err) {
    console.log(err);
  }
}

function ensureExists(path) {
  fs.ensureDir(path);
  return new Promise(resolve => {
    resolve();
  });
}
function formatDate(date) {
  return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
}

module.exports = router;
