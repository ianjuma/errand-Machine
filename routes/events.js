var Event = require('../models/events');


// set full text search with events
exports.getEvents = function(req, res) {

	Event.orderBy( "creation_date" ).run(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Event sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
	    }
	});
};


exports.addEvent = function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var new_event = new Event({
		id: req.body.id,
	    title: req.body.title,
	    image: req.body.image,
	    description: req.body.description,
	    venue: req.body.venue,
	    admin: req.body.admin
	});

	new_event.save(function(error, result) {
		if (result == null) {
			res.status(400).json({ "Error": "Event Already Exists" });
		}
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Event Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'Event Created'});
	    }
	});
};


exports.getEventById = function(req, res) {

	Event.get( req.params.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Event Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Event sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
		}
	});
};


exports.updateEventById = function(req, res) {

	var _event = new Event({
		id: req.body.id,
	    title: req.body.title,
	    image: req.body.image,
	    description: req.body.description,
	    venue: req.body.venue,
	    admin: req.body.admin
	});

	Event.get( req.params.id ).update(_event).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Event Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Event updated');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json(_event);
		}
	});
};


exports.deleteEventById = function(req, res) {

	Event.get( req.params.id ).delete().run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Event Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Event deleted');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json({ 'OK': 'Event Deleted' });
		}
	});
};
