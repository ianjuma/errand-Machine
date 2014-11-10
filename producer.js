var kueConfig = require('./config/workers');
var kue = require('kue')
  , redis = require('redis')
  , jobs = kue.createQueue(kueConfig.kue);


function sendwelcomeEmail (user) {

	// within a closure
	(function() {
		var job = jobs.create('email', {
		    title: 'welcome for ' + user,
		    to: "ian.j@ymail.com",
		    template: 'welcome-email'
		}).priority('high');

		job.attempts(2).backoff( true );
		job.save();

		job.on('complete', function() {
			console.log('Job Complete');
		});
		
	})(user);

}

sendwelcomeEmail("Ian");

/*
 job tracking interface will be set out of the app scope
 far much better - its a tiny express app
 	var kue = require('kue');
	kue.createQueue();
	kue.app.listen(3000);
*/
