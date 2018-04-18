var express = require('express');
var router = express.Router();
var {paymentClient} = require('../paymentClient.js');

router.post('/', function(req, res, next) {  
  transactionAddresses = [];
  transactions = [];
  var itemsProcessed = 0;

  //Gets array of all transactions Addresses
  paymentClient.getTxList(function (error, response) {
    if(response && error == null){
      transactionAddresses = response;
    } else {
      res.status = '404';
      res.send({error: error});
      res.end();
    }

    //Gets details of each transaction
    transactionAddresses.forEach(address => {
      paymentClient.getTx(address, function(error,result){
        transactions.push(result)
        itemsProcessed++; 

        if(itemsProcessed == transactionAddresses.length){
          res.send(transactions);
        }
      });
    });
  })
});

module.exports = router; 