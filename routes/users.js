var User = require('../models/users');


exports.addUser = function(req, res) {

  User.orderBy( "date_joined" ).filter({ email: req.body.email }).run(function(error, result) {
    if (error) {
      res.status(500).json({ "error": "something blew up, we're fixing it" });
    }
    if (result.length > 0) {
      console.log(result);
      res.status(400).json({ "Error": "Email already registered" });
    }
    else {
      var new_user = new User({
        id: req.body.email,
        email: req.body.email,
        password: req.body.password,
        name: req.body.fullName,
        terms: req.body.terms,
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
            'Content-Type': 'application/json'
          });
          res.status(200).json({ 'OK': 'User Created'});
        }
      });
    }
  });
};


exports.getUserById = function(req, res) {

  User.get( req.user.id ).run(function(error, result) {
    if (result == null) {
      res.status(404).json({ "Error": "User Not Found" });
    }
    if (error) {
      res.status(500).json({ "error": "something blew up, we're fixing it" });
    }
    else {
      console.log('user info fetched');

      res.set({
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
