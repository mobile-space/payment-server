var express = require('express');
var router = express.Router();
var paymentClient = require('../paymentClient.js');
var request = require('request');
var transaction= {}; 

router.post('/', function(req, res, next) {
  var transaction= {}; 
  
  paymentClient.createTransaction({'currency1' : 'LTCT', 'currency2' : 'LTCT', 'amount' : 0.1},function(error,result){
    
    if(error == null && result){
      transaction = Object.assign({}, result);
      res.send({transaction: transaction});
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
  
  paymentClient.on('autoipn', function(data){
   if(isFirstPing && status == 0){
      //Pending
       isFirstPing = false; 
       response = Object.assign({},data,transaction)
       res.send({transaction: response})
     } else if (status == 1){
       //Complete 
       res.send({
         transaction: response,
       })
     } else {
       //Failure
       res.send({
        transaction: response,
       })
     }

   });  
});


module.exports = router;