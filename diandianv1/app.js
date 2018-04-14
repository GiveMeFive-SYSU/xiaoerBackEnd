var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

// triservice

// http
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// db
var mysql = require('mysql');

// routes
var index = require('./routes/index');
var users = require('./routes/users');
var bankcard = require('./routes/bankCard');
var testdb = require('./routes/testdb');

// encoding 加密
var SHA = require('./encrypt/sha1');


// search API
//
var api_root_flouder = __dirname +  "/routes/api/v1/";
var api_call_base_str = '/api/v1/';

var searchFood = require(api_root_flouder+'searchFood');
var searchOrder = require(api_root_flouder+'searchOrder');
var searchQRcode = require(api_root_flouder+'searchQRcode');
var searchTable = require(api_root_flouder+'searchTable');
var getWxOpenID = require(api_root_flouder+'getWxOpenID');


var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));




app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);



// router
app.use('/users', users);
app.use('/bankcard', bankcard);
app.use('/test/db', testdb);

// api handler
app.use(api_call_base_str + 'searchFood', searchFood);
app.use(api_call_base_str + 'searchOrder', searchOrder);
app.use(api_call_base_str + 'searchQRcode', searchQRcode);
app.use(api_call_base_str + 'searchTable', searchTable);
app.use(api_call_base_str+'getOpenID', getWxOpenID);


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
