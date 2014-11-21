module.exports = {

	facebookAuth : {
		'clientID' 		: '621922847912624',
		'clientSecret' 	: '85dbd59fae3f893fdfa250e9874cb340',
		'callbackURL' 	: 'http://localhost:8000/auth/facebook/callback',
		'enableProof'   : false,
		'profileFields' : ['id', 'name', 'displayName', 'photos', 'emails']
	},

	googleAuth : {
		'clientID' 		: '610994249103-jk2e52c868rk2omnk5hegpirpeki4frm.apps.googleusercontent.com',
		'clientSecret' 	: 'jjN3mRwZpYXTGayZayCynjWJ',
		'callbackURL' 	: 'http://127.0.0.1:8000/auth/google/callback'
	},

	passwordSalt: {
		salt: '$2a$10$KMwDkvODRe1GMqlJf.lXvO'
	}

};
