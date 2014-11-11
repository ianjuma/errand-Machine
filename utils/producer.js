var kue = require('kue')
  , redis = require('redis')
  , kueConfig = require('../config/workers')
  , jobs = kue.createQueue(kueConfig.kue);


function sendwelcomeEmail (user) {
	(function() {
		var job = jobs.create('email', {
		    title: 'Welcome for ' + user.name,
		    to: user.email,
		    body: "Welcome to taskwetu, visit our site at www.taskwetu.com"
		}).priority('high');

		job.attempts(2).backoff( true );
		job.save();

	})(user);
}


/*
 job tracking interface will be set out of the app scope
 far much better - its a tiny express app
 	var kue = require('kue');
	kue.createQueue();
	kue.app.listen(3000);
*/
