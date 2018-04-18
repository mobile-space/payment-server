var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var paymentRouter = require('./routes/payment');
var transactionsRouter = require('./routes/transactions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); 

app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes  
app.use('/', indexRouter);
app.use('/payment', paymentRouter);
app.use('/transactions', transactionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

let CoinPayments = require('coinpayments');
let bodyParser   = require('body-parser');
    
app.use(bodyParser.urlencoded({ extended: true }));

//Initializes midleware for coinpayments IPN
let events = CoinPayments.events;
let middleware = [
  CoinPayments.ipn({
    'merchantId': '5d47493d32482aef464ac46d11ccd4ef714bac28ff06726208bdcc487b5c5b16',
    'merchantSecret': '622c3064DBd9Fffd20B63655c0Ede039c0caF3E3eBc3601F4CDBFe6ee00e0774',
     autoIpn: true
  }), 
  function (req, res, next) {
    // Handle via middleware
    console.log(req.body);
  }]
 
// app.use('/', middleware);

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
