var PesaPal = require('pesapaljs')
  , config = require('../config/pesapal');

PesaPal.initialize(config.pesapal);


exports.ipn = function(req, res) {
	var payment = req.payment;
    // listener for payment events with payment { transaction, method, status, reference }
};


exports.makeOrder = function(req, res) {
	var payment   = req.payment;
	var ref_no    = req.ref_no;
	var item      = req.item;
	var price     = req.price;
	var currency  = req.currency;
	var email     = req.email;

	var customer = new PesaPal.Customer(email);
	var order = new PesaPal.Order(ref_no, customer, item, price, currency, "MERCHANT");

	// Redirect user to PesaPal
	var url = PesaPal.getPaymentURL(order, "https://taskwetu.com/ouathCallBack");
};
