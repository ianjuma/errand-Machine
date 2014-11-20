var User = require('../models/users')
  , bcrypt = require('bcryptjs')
  , oauthConfig = require('../config/auth');



exports.getUserById = function(req, res) {
	
	User.get( req.params.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "User Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		}
		else {
		    console.log('user info fetched');

		    res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
		}
	});
};


exports.getUserByEmail = function(req, res) {

	User.filter({ 'email': req.body.email }).limit(1).run(function(error, result) {
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
		    console.log('user info fetched');

		    res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
		}
	});
};


exports.deleteUserById = function(req, res) {
	
	User.get( req.params.id ).delete().run( function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "User Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('user removed');

	        res.set({
			  'Content-Type': 'application/json'
			});
			res.status(200).json({'OK': 'User deleted'});
		}
	});
};


exports.updateUserEmailById = function(req, res) {

	var _user = new User({
    	email: req.body.userEmail
	});

	User.get( req.params.id ).update(_user).run( function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "User Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		}
		else {
	        console.log('user email updated');

	        res.set({
			  'Content-Type': 'application/json'
			});
			res.status(200).json(_user);
		}
	});
};


exports.updateUserPassById = function(req, res) {

	var _user = new User({
    	password: bcrypt.hashSync(req.body.password, oauthConfig.passwordSalt.salt)
	});

	User.get( req.params.id ).update(_user).run( function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "User Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		}
		else {
	        console.log('user pass updated');

	        res.set({
			  'Content-Type': 'application/json'
			});
			res.status(200).json(_user);
		}
	});
};
