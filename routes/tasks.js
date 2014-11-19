var slug = require('slug')
  , Task = require('../models/tasks');


exports.addTask= function(req, res) {

	var new_task = new Task({
	    task_title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    username: req.body.username,
	    author_id: req.body.idAuthor,
	    due_date: req.body.due_date,
	    task_description: req.body.task_description,
	    task_urgency: req.body.task_urgency
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

	Task.orderBy( "creation_date" ).run(function(error, result) {
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


exports.getTasksByUserId = function(req, res) {

	Task.orderBy( "creation_date" ).filter({ author_id: req.params.author_id }).run(function(error, result) {
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
		task_title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    username: req.body.username,
	    author_id: req.body.idAuthor,
	    ratetask: req.body.ratetask,
	    due_date: req.body.due_date,
	    task_description: req.body.task_description,
	    task_urgency: req.body.task_urgency
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
