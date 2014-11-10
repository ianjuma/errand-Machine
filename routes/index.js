exports.index = function(req, res) {
	if (req.isAuthenticated()) {
	  res.render('app', { title: 'taskwetu', user: req.user });
	  console.log(req.user);
	} else {
	  res.render('index', { title: 'taskwetu' });
	}
};


exports.app = function(req, res) {
  res.render('app', { title: 'taskwetu | App' });
};


/*
exports.about = function(req, res) {
  res.render('about', { title: 'taskwetu | About' });
};

exports.help = function(req, res) {
  res.render('app', { title: 'taskwetu | Help' });
};

exports.team = function(req, res) {
  res.render('team', { title: 'taskwetu | Team' });
};
*/


exports.login = function(req, res) {
  res.render('login', { title: 'taskwetu | Login' });
};


exports.checkApi = function(req, res) {
  res.render('users', { title: 'taskwetu', content: 'API is running' });
};
