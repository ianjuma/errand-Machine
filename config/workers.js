module.exports = {
	kue: {
	  prefix: 'q',
	  redis: {
	    port: 6379,
	    host: 'localhost',
	    auth: '',
	    db: 1,
	    options: {
	    }
	  },
     disableSearch: true
	},
	sendgrid: {
		api_user: '',
		api_key: ''
	}
};
