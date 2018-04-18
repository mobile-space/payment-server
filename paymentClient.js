var options = [];

options.key = '5d47493d32482aef464ac46d11ccd4ef714bac28ff06726208bdcc487b5c5b16';
options.secret = '622c3064DBd9Fffd20B63655c0Ede039c0caF3E3eBc3601F4CDBFe6ee00e0774';

var Coinpayments = require('coinpayments');
var paymentClient = new Coinpayments(options);
let events = CoinPayments.events;

ipnCallback = () => {
  events.on('ipn_fail', function(data){
      // Handle failed transaction
      console.log("IPN FAIL");
      console.log(data);
  });
  events.on('ipn_pending', function(data){
      // Handle pending payment
      console.log("IPN PENDING");
      console.log(data);
  });
  events.on('ipn_complete', function(data){
      // Handle completed payment
      console.log("IPN COMPLETE");
      console.log(data);
  });
}

module.exports = {
  paymentClient,
  ipnCallback
}