exports.index = function(req, res) {
	if (req.isAuthenticated()) {
		res.render('mytasks', { title: 'Task Kwetu | View Tasks', user: req.user });
		console.log(req.user);
	} else {
		res.render('index', { title: 'Task Kwetu' });
	}
};


exports.create = function(req, res) {
  res.render('create', { title: 'Task Kwetu | Create Task', user: req.user });
};


exports.mytasks = function(req, res) {
  res.render('mytasks', { title: 'Task Kwetu | View Tasks', user: req.user,  });
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
