var Support = require('../models/support');


exports.addTicket= function(req, res) {

	var new_ticket = new Support({
	    userId: req.body.userId,
	    title: req.body.supportTitle,
	    ticket: req.body.supportTicket,
	    support_urgency: req.body.supportUrgency
	});

	new_ticket.save(function(error, result) {
		if (result == null) {
			res.status(400).json({ "Error": "Ticket Already Exists" });
		}
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Ticket Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'Ticket Created'});
	    }
	});
};


exports.getAllTickets = function(req, res) {

	Support.orderBy( "creation_date" ).run(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Support Sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
	    }
	});
};
