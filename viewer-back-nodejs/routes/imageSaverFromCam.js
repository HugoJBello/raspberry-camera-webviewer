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
  var sql = 'insert into image (date_taken,path,filename) values (sysdate(),"' + destinyPath + '","' + req.body.filename + '");'
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
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
