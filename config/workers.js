module.exports = {
	kue: {
	  prefix: 'q',
	  redis: {
	    port: 6379,
	    host: 'localhost',
	    auth: '',
	    db: 'taskwetu',
	    options: {
	    }
	  },
     disableSearch: true
	},
	sendgrid: {
		api_user: 'app27418636@heroku.com',
		api_key: 'w4do409h'
	}
};
