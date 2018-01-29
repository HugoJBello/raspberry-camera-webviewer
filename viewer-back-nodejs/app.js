var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var checkJwt = require('./auth/checkJwt');
var config = require('./config/config');

var imageQuery = require('./routes/imageQuery');
var imageQueryPagedSearch = require('./routes/imageQueryPagedSearch');
var imageSaverFromCam = require('./routes/imageSaverFromCam');
var imageSender = require('./routes/imageSender');

const cors = require('cors');
//const checkScopes = jwtAuthz([ 'openid profile read:images' ]);


var app = express();
app.use(cors());

app.enable('trust proxy');

//app.use(jwtCheck);
//app.use(checkScopes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'picam-viewer-backend');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


if (config.useAuth0){
  app.use('/images/',checkJwt);
}

app.use('/images/', imageQuery);
app.use('/images/', imageQueryPagedSearch);
app.use('/', imageSaverFromCam);
app.use('images/', imageSender);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; 
