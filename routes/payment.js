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
      res.status = 404;
      res.send(error)

    }
  });
});

router.post('/info', function(req, res, next) {
  if(req.body.transactionID){
    paymentClient.getTx(req.body.transactionID, function(error,result){
      if(error != null && result){
        res.send({transaction: transaction});
      } else {
        res.status = 404;
        res.send(error)
      }
    });
  } else {
    res.status = 404
    res.send("Error! Missing transaction ID!")
  }
});

router.post('/status', function(req, res, next) {
  if(req.body.transactionID){
    paymentClient.getTx(req.body.transactionID, function(error,result){
      if(error != null && result){
        res.send({transaction: transaction});
      } else {
        res.status = 404;
        res.send(error)
      }
    });
  } else {
    res.status = 404
    res.send("Error! Missing transaction ID!")
  }
});

module.exports = router;