exports.index = function(req, res) {
	if (req.isAuthenticated()) {
		res.render('mytasks', { title: 'Task Kwetu | View Tasks', user: req.user });
		console.log(req.user);
	} else {
		res.render('index', { title: 'Task Kwetu' });
	}
};


exports.newTask = function(req, res) {
  res.render('newtask', { title: 'Task Kwetu | Create Task', user: req.user });
};


exports.myTasks = function(req, res) {
  res.render('mytasks', { title: 'Task Kwetu | My Tasks', user: req.user,  });
};


exports.myAccount = function(req, res) {
  res.render('myaccount', { title: 'Task Kwetu | My Account', user: req.user,  });
};


exports.support = function(req, res) {
  res.render('support', { title: 'Task Kwetu | support', user: req.user });
};


exports.login = function(req, res) {
  res.render('login', { title: 'Task Kwetu | Login' });
};


exports.signup = function(req, res) {
  res.render('signup', { title: 'Task Kwetu | Signup' });
};
