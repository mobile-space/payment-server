var express = require('express');
var router = express.Router();
var paymentClient = require('../paymentClient.js');
var request = require('request');
var transaction= {}; 

router.post('/', function(req, res, next) {
  var isFirstPing = true;
  var response = {};
  
  paymentClient.createTransaction({'currency1' : 'LTCT', 'currency2' : 'LTCT', 'amount' : 0.1},function(err,result){
    transaction = Object.assign({}, result);
  });

  paymentClient.on('autoipn', function(data){
    var transactionID = transaction.txn_id
    var status = data[transactionID].status

    console.log("TEST");
    console.log(status) 
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