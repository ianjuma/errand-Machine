var User = require('../models/users');


exports.index = function(req, res) {
	if (req.isAuthenticated()) {

		User.get( req.user.id ).run(function(error, result) {
			if (result == null) {
				res.status(404).json({ "Error": "User Not Found" });
			}
			if (error) {
				res.status(500).json({ "error": "something blew up, we're fixing it" });
			}
			else {
				if (result.provider == 'local') {
					result.provider = false;
				} else { result.provider = true; }
				res.render('mytasks', { title: 'Task Kwetu | My Tasks', user: req.user, result: result });
			}
		});

	} else {
		res.render('index', { title: 'Task Kwetu' });
	}
};


exports.forgotPass = function(req, res) {
  res.render('fpassword', { title: 'Task Kwetu | Password Reset' });
};


exports.newTask = function(req, res) {
  res.render('newtask', { title: 'Task Kwetu | Create Task', user: req.user });
};


exports.myTasks = function(req, res) {
	User.get( req.user.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "User Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		}
		else {
			if (result.provider == 'local') {
				result.provider = false;
			} else { result.provider = true; }
			res.render('mytasks', { title: 'Task Kwetu | My Tasks', user: req.user, result: result });
		}
	});
};


exports.addUser = function(req, res) {
	User.get( req.body.email ).run(function(error, result) {
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		}
		if (result != null || result != [] || result != '') {
			res.status(400).json({ "Error": "Email already registered" });
		}
		else {
			var new_user = new User({
				id: req.body.email,
			    email: req.body.email,
			    password: req.body.password,
			    name: req.body.fullName,
			    provider: 'local',
			    profile_url: "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
			});
			new_user.save(function(error, result) {
			    if (error) {
			        res.status(500).json({ error: "something blew up, we're fixing it" });
			    }
			    else {
			        console.log('User Saved');
			        // mailApi.taskCreated(req.user);

		        	res.set({
					  'Content-Type': 'application/json',
					});
					res.status(200).json({ 'OK': 'User Created'});
			    }
			});
		}
	});
};


exports.myAccount = function(req, res) {
  	User.get( req.user.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "User Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		}
		else {
			if (result.provider == 'local') {
				result.provider = false;
			} else { result.provider = true; }
			res.render('myaccount', { title: 'Task Kwetu | My Account', user: req.user, result: result });
		}
	});
};


exports.support = function(req, res) {
  res.render('support', { title: 'Task Kwetu | support', user: req.user });
};


exports.login = function(req, res) {
  res.render('login', { title: 'Task Kwetu | Login', message: req.flash('error') });
};


exports.signup = function(req, res) {
  res.render('signup', { title: 'Task Kwetu | Signup', message: req.flash('error') });
};
