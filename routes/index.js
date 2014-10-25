var express = require('express');
var router = express.Router();


exports.index = function(req, res) {
	if (req.isAuthenticated()) {
	  res.render('app', { title: 'Ink Overflow', user: req.user[0] });
	  console.log(req.user);
	} else {
	  res.render('index', { title: 'Ink Overflow' });
	}
};


exports.app = function(req, res) {
  res.render('app', { title: 'Ink Overflow | App' });
};


exports.about = function(req, res) {
  res.render('about', { title: 'Ink Overflow | About' });
};


exports.login = function(req, res) {
  res.render('login', { title: 'Ink Overflow | Login' });
};


exports.checkApi = function(req, res) {
  res.render('users', { title: 'Ink Overflow', content: 'API is running' });
};


//module.exports = router;
