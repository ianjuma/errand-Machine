var kue = require('kue')
  , redis = require('redis')
  , kueConfig = require('../config/workers')
  , crypto = require('crypto')
  , jobs = kue.createQueue(kueConfig.kue);


exports.sendWelcomeEmail = function (user) {
	(function() {
		var job = jobs.create('email', {
		    title: 'Welcome to errand',
		    to: user.email,
		    body: "Welcome to errand, visit our site at www.errand.com"
		}).priority('high');

		job.attempts(2).backoff( true );
		job.save();

	})(user);
};


exports.taskCreated = function (user) {
	(function() {
		var job = jobs.create('email', {
		    title: 'Task created successfully',
		    to: user.email,
		    body: 'Your task has been successfully created, please visit ' + 
		    		'the errand dashboard to view your task progress, thank you!'
		}).priority('high');

		job.attempts(2).backoff( true );
		job.save();

	})(user);
};


exports.taskUpdated = function (user) {
	(function() {
		var job = jobs.create('email', {
		    title: 'Task updated successfully',
		    to: user.email,
		    body: 'Your task has been successfully updated, please visit ' + 
		    		'the errand dashboard to view your task progress, thank you!'
		}).priority('high');

		job.attempts(2).backoff( true );
		job.save();

	})(user);
};


exports.passwordReset = function (user) {
	(function() {
		var job = jobs.create('email', {
		    title: 'Password Reset',
		    to: user.email,
		    body: 'Your password has been reset to ' + user.password
		}).priority('high');

		job.attempts(2).backoff( true );
		job.save();

	})(user);
};


exports.RandomString = function (howMany) {
    chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };

    return value.join('');
};
