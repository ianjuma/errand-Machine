var kueConfig = require('./config/worker_queue');


var kue = require('kue')
  , redis = require('redis')
  , jobs = kue.createQueue(kueConfig.kue);

jobs.process('email', function(job, done) {
	console.log(job.data);

	setTimeout(function(){
		console.log('Job done');
		done(new Error('some error happened'));
	}, 3000);
});
