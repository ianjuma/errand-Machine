var kue = require('kue')
  , kueConfig = require('../config/workers')
  , redis = require('redis')
  , jobs = kue.createQueue(kueConfig.kue)
  , sendgrid  = require('sendgrid')(kueConfig.sendgrid);


jobs.process('email', function(job, done) {
	console.log(job.data);

	sendgrid.send({
	  to:       job.to,
	  from:     'no-reply@taskwetu.com',
	  subject:  job.title,
	  text:     job.body
	}, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});

});
