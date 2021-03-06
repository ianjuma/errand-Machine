var slug = require('slug')
  , Task = require('../models/tasks');


exports.addTask= function(req, res) {

  var urgency = "NOT_URGENT";
  if (req.body.taskUrgency == true) {
    urgency = "URGENT";
  }

  var new_task = new Task({
    userId: req.user.id,
    task_title: req.body.taskTitle,
    _slug: slug((req.body.taskTitle).toLowerCase()),
    task_description: req.body.taskDescription,
    task_urgency: urgency
  });

  console.log(new_task);

  new_task.save(function(error, result) {
    if (result == null) {
      res.status(400).json({ "Error": "Task Already Exists" });
    }
    if (error) {
      res.status(500).json({ error: "something blew up, we're fixing it" });
    }
    else {
      console.log('Task Saved');
      // mailApi.taskCreated(req.user);

      res.set({
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
      });

      res.status(200).json(result);
    }
  });
};


exports.getTasksByUserId = function(req, res) {

  Task.orderBy( "creation_date" ).filter({ userId: req.user.id }).run(function(error, result) {
    if (error) {
      res.status(500).json({ error: "something blew up, we're fixing it" });
    }
    else {
      console.log('Task sent');
      res.set({
        'Content-Type': 'application/json'
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
    userId: req.body.userId,
    task_description: req.body.taskDescription,
    task_title: req.body.taskTitle,
    _slug: slug((req.body.taskTitle).toLowerCase()),
    ratetask: req.body.rateTask,
    task_urgency: req.body.taskUrgency
  });

  Task.get( req.params.id ).update(_task).run(function(error, result) {
    if (result == null) {
      res.status(404).json({ "Error": "Task Not Found" });
    }
    if (error) {
      res.status(500).json({ "error": "something blew up, we're fixing it" });
    } else {
      console.log('Task updated');
      // mailApi.taskUpdated(req.user);

      res.set({
        'Content-Type': 'application/json'
      });

      res.status(200).json(_task);
    }
  });
};
