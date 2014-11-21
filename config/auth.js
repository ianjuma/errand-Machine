module.exports = {

	facebookAuth : {
		'clientID' 		: '621922847912624',
		'clientSecret' 	: '85dbd59fae3f893fdfa250e9874cb340',
		'callbackURL' 	: 'https://taskwetu.com/auth/facebook/callback',
		'enableProof'   : false,
		'profileFields' : ['id', 'name', 'displayName', 'photos', 'emails']
	},

	googleAuth : {
		'clientID' 		: '610994249103-jk2e52c868rk2omnk5hegpirpeki4frm.apps.googleusercontent.com',
		'clientSecret' 	: 'jjN3mRwZpYXTGayZayCynjWJ',
		'callbackURL' 	: 'https://taskwetu.com/auth/google/callback'
	},

	passwordSalt: {
		salt: '$2a$10$KMwDkvODRe1GMqlJf.lXvO'
	}

};
