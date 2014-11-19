var kue = require('kue')
  , redis = require('redis')
  , kueConfig = require('../config/workers')
  , jobs = kue.createQueue(kueConfig.kue);


function sendwelcomeEmail (user) {
	(function() {
		var job = jobs.create('email', {
		    title: 'Welcome to Taskwetu',
		    to: user.email,
		    body: "Welcome to taskwetu, visit our site at www.taskwetu.com"
		}).priority('high');

		job.attempts(2).backoff( true );
		job.save();

	})(user);
}


function taskCreated (user) {
	(function() {
		var job = jobs.create('email', {
		    title: 'Task created successfully',
		    to: user.email,
		    body: 'Your task has been successfully created, please visit ' + 
		    		'the taskwetu dashboard to view your task progress, thank you!'
		}).priority('high');

		job.attempts(2).backoff( true );
		job.save();

	})(user);
}


function passwordReset (user) {
	(function() {
		var job = jobs.create('email', {
		    title: 'Password Reset',
		    to: user.email,
		    body: 'Your password has been reset to ' + user.password
		}).priority('high');

		job.attempts(2).backoff( true );
		job.save();

	})(user);
}


passwordReset({ email: "wjuma@tudents.usiu.ac.ke", password: "root" });
