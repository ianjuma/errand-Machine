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
        result.provider = result.provider != 'local';
        res.render('app', { title: 'Errand | My Tasks', user: req.user, result: result });
      }
    });

  } else res.render('index', {title: 'Errand'});
};


exports.login = function(req, res) {
  res.render('login', { title: 'Errand | Login', message: req.flash('error') });
};


exports.signup = function(req, res) {
  res.render('signup', { title: 'Errand | Signup', message: req.flash('error') });
};


exports.forgotPass = function(req, res) {
  res.render('fpassword', { title: 'Errand | Password Reset' });
};
