var Notification = require('../models/notification');


exports.addNotification = function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var new_notification = new Notification({
		id: req.body.id,
	    content: req.body.content,
	});

	new_notification.save(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Notification Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'Notification Created'});
	    }
	});
};


exports.getNotificationById = function(req, res) {

	Notification.get( req.params.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "No Such notification" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Notification sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
		}
	});
};


exports.getNotifications = function(req, res) {

	Notification.orderBy( "notification_date" ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "No Such notification" });
		}
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Notification sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
	    }
	});
};


exports.deleteNotificationById = function(req, res) {

	Notification.get( req.params.id ).delete().run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "No Such notification" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Notification deleted');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json({ 'OK': 'Notification Deleted' });
		}
	});
};


exports.updateNotificationById = function(req, res) {

	var _notification = new Notification({
		content: req.body.content,
	});

	Notification.get( req.params.id ).update(_notification).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "No Such notification" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Notification updated');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json(_notification);
		}
	});
};
