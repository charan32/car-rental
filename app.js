var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var dbService=require('./config/db')
var fs=require('fs');


var app = express();

// const privateKey = fs.readFileSync('/etc/letsencrypt/live/charanpandaassesment.duckdns.org/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/charanpandaassesment.duckdns.org/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/charanpandaassesment.duckdns.org/chain.pem', 'utf8');

// const credentials = {
//         key: privateKey,
//         cert: certificate,
//         ca: ca
// };


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',usersRouter );
app.use('/user', usersRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
dbService.connectToServer(function(response){
 
	var http = require('http');
  http.createServer(app).listen(80).timeout = 180000;
  // var https = require('https');
  // var httpsServer = https.createServer(credentials, app).listen(443);
     
});
module.exports = app;
