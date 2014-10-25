module.exports = {

	facebookAuth : {
		'clientID' 		: '294252064102183',
		'clientSecret' 	: '095c145e3ec74212adc8f25364f02909',
		'callbackURL' 	: 'http://localhost:8000/auth/facebook/callback',
		'enableProof'   : false,
		'profileFields' : ['id', 'name', 'displayName', 'photos', 'emails']
	},

	twitterAuth : {
		'consumerKey' 		: 'gqGPNDaaIezn5rcELJns6ghNh',
		'consumerSecret' 	: 'qaLqzAv1LxiD9yF2tmNScg4jQW794prYMq3aXK84G0xysV4p8j',
		'callbackURL' 		: 'http://127.0.0.1:8000/auth/twitter/callback'
	},

	googleAuth : {
		'clientID' 		: '1006439073888-ll6qdu340hjvmrbjdvsak84a69r510s6.apps.googleusercontent.com',
		'clientSecret' 	: '3Nz7wkOsA0LZgWGo2h4w7Nuv',
		'callbackURL' 	: 'http://127.0.0.1:8000/auth/google/callback',
	}

};
