var express = require('express');
var router = express.Router();
var paymentClient = require('../paymentClient.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  //Account Test
  paymentClient.getBasicInfo(function (err, response) {
    console.log(response)
  })

  //transaction test

  paymentClient.createTransaction({'currency1' : 'LTCT', 'currency2' : 'LTCT', 'amount' : 0.01},function(err,result){
    console.log(result);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
