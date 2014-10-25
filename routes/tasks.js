var slug = require('slug');
var Task = require('../models/tasks');

var reth = require('rethinkdb');


exports.addTask= function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var new_task = new Task({
		id: req.body.id,
	    title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    content: req.body.content,
	    author_id: req.body.idAuthor
	});

	new_task.save(function(error, result) {
		if (result == null) {
			res.status(400).json({ "Error": "Task Already Exists" });
		}
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Task Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'Task Created'});
	    }
	});
};


exports.getTaskById = function(req, res) {

	Task.get( req.params.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Task Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Task sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
		}
	});
};


exports.getTasks = function(req, res) {

	Task.orderBy( "creation_date" ).getJoin().run(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Task sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
	    }
	});
};


exports.deleteTaskById = function(req, res) {

	Task.get( req.params.id ).delete().run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Task Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Task deleted');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json({ 'OK': 'Task Deleted' });
		}
	});
};


exports.updateTaskById = function(req, res) {

	var _task = new Task({
		id: req.body.id,
	    title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    content: req.body.content,
	    idAuthor: req.body.idAuthor
	});

	Task.get( req.params.id ).update(_task).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Task Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Task updated');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json(_task);
		}
	});
};
