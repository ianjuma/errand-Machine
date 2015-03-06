module.exports = {

	facebookAuth : {
		'clientID' 		: '',
		'clientSecret' 	: '',
		'callbackURL' 	: 'http://localhost:8000/auth/facebook/callback',
		'enableProof'   : false,
		'profileFields' : ['id', 'name', 'displayName', 'photos', 'emails']
	},

	googleAuth : {
		'clientID' 		: '',
		'clientSecret' 	: '',
		'callbackURL' 	: 'http://127.0.0.1:8000/auth/google/callback'
	},

	passwordSalt: {
		salt: '$2a$10$KMwDkvODRe1GMqlJf.lXvO'
	}

};
