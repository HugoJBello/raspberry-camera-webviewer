var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var imageQuery = require('./routes/imageQuery');
var imageQueryPagedSearch = require('./routes/imageQueryPagedSearch');
var imageSaverFromCam = require('./routes/imageSaverFromCam');

var users = require('./routes/users');

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const jwtAuthz = require('express-jwt-authz');

var jwtCheck = jwt({ 
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://cam-viewer-hjbello.eu.auth0.com/.well-known/jwks.json"
  }),
  audience: 'picam-viewer-back-angular',
  issuer: "https://cam-viewer-hjbello.eu.auth0.com/",
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'openid profile read:images' ]);

var app = express();
app.use(cors());
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

app.use('/', imageQuery);
app.use('/', imageQueryPagedSearch);
app.use('/', imageSaverFromCam);


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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
