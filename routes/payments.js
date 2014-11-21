var config = require('../config/pesapal')
  , PesaPal = require('pesapaljs').init(config.pesapal);


exports.ipn = function(req, res) {
	var payment = req.payment;
    // listener for payment events with payment { transaction, method, status, reference }

    // DO NOT res.send()
    // update taskInfo
};


exports.makeOrder = function(req, res) {
	var payment   = req.payment;
	var ref_no    = req.ref_no; // ref_no -> task id
	var item      = req.item;
	var price     = req.price;
	var currency  = req.currency;

	var customer = new PesaPal.Customer(req.email);
	var order = new PesaPal.Order(ref_no, customer, item, price, currency, "MERCHANT");

	// Redirect user to PesaPal
	var url = PesaPal.getPaymentURL(order, "https://taskwetu.com/ouathCallBack");

	res.render('payment', { title: 'Task Kwetu | Payment', user: req.user, iframe: url });
};
