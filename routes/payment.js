var express = require('express');
var router = express.Router();
var {paymentClient, ipnCallback} = require('../paymentClient.js');
var request = require('request');
var transaction= {}; 

router.post('/', function(req, res, next) {
  var transaction= {}; 

  paymentClient.createTransaction({'currency1' : 'LTCT', 'currency2' : 'LTCT', 'amount' : 0.1},function(error,result){
    if(error == null && result){
      transaction = Object.assign({}, result);
      res.send({transaction});
    } else {
      //Do something
    }
  });

});

router.post('/info', function(req, res, next) {
  if(req.body.transactionID){
    paymentClient.getTx(req.body.transactionID, function(error,result){
      res.send({transaction: transaction});
    });
  }
});

router.post('/status', function(req, res, next) {
  ipnCallback();
});

module.exports = router;