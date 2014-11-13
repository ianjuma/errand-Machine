var User = require('../models/users');


exports.addUser = function(req, res) {

	var new_user = new User({
    	name: req.body.name,
    	email: req.body.email,
    	dob: req.body.dob,
    	profile_url: req.body.profile_url
	});

	new_user.save(function(error, result) {
		if (result == null) {
			res.status(400).json({ "Error": "User Already Exists" });
		}
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('User Saved');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'User Created'});
	    }
	});
};


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


exports.updateUserById = function(req, res) {

	var _user = new User({
    	name: req.body.name,
    	dob: req.body.dob,
    	profile_url: req.body.profile_url,
    	email: req.body.email
	});

	User.get( req.params.id ).update(_user).run( function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "User Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		}
		else {
	        console.log('user updated');

	        res.set({
			  'Content-Type': 'application/json'
			});
			res.status(200).json(_user);
		}
	});
};
