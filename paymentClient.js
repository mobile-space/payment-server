var options = [];

options.key = '5d47493d32482aef464ac46d11ccd4ef714bac28ff06726208bdcc487b5c5b16';
options.secret = '622c3064DBd9Fffd20B63655c0Ede039c0caF3E3eBc3601F4CDBFe6ee00e0774';
options.autoIpn = true; 

var Coinpayments = require('coinpayments');
var paymentClient = new Coinpayments(options);

module.exports = paymentClient;