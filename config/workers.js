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
		api_user: 'IanJuma',
		api_key: 'obamanation2008'
	}
};
