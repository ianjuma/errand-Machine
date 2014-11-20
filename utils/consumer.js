var kue = require('kue')
  , kueConfig = require('../config/workers')
  , redis = require('redis')
  , jobs = kue.createQueue(kueConfig.kue)
  , sendgrid  = require('sendgrid')
  , sendgrid = new sendgrid(kueConfig.sendgrid.api_user, kueConfig.sendgrid.api_key);


jobs.process('email', function(job, done) {
	console.log(job.data);

	sendgrid.send({
	  to:       job.data.to,
	  from:     'no-reply@taskwetu.com',
	  subject:  job.data.title,
	  text:     job.data.body
	}, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});
});


/*
 job tracking interface will be set out of the app scope
 far much better - its a tiny express app
 	var kue = require('kue');
	kue.createQueue();
	kue.app.listen(3000);
*/
