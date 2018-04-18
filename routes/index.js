var express = require('express');
var router = express.Router();
var paymentClient = require('../paymentClient.js');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Account Test
  paymentClient.getBasicInfo(function (err, response) {
    console.log(response)
  })

  res.render('index', { title: 'Express' });
});

router.get('/market', function(req, res, next) {
  request('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,BCH&tsyms=BTC,USD', function (error, response, body) {
      console.log("TEST")
      if (!error && response.statusCode == 200) {
          console.log(body) // Print the google web page.
       }
  })
});


//POST for payment 





module.exports = router;
