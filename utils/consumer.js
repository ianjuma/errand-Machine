var kue = require('kue')
  , kueConfig = require('../config/workers')
  , redis = require('redis')
  , jobs = kue.createQueue(kueConfig.kue)
  , sendgrid  = require('sendgrid')(kueConfig.sendgrid);


jobs.process('email', function(job, done) {
	console.log(job.data);

	setTimeout(function() {
		console.log('Job done');
		done(new Error('some error happened'));
	}, 3000);
});
