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

module.exports = router;
