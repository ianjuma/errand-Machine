module.exports = function(app, express) {
	var session = require('express-session');
	var flash = require('connect-flash');
	var RedisStore = require('connect-redis')(session);
	var exphbs  = require('express-handlebars');
	var path = require('path');
	var favicon = require('serve-favicon');
	var logger = require('morgan');
	var fs = require('fs');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');

	var passportSession = require('./routes/authentication');
	var config = require('./config/database');

	// import models to be used
	var index = require('./routes/index');
	var users = require('./routes/users');
	var tasks = require('./routes/tasks');
	var authentication = require('./routes/authentication');


	var port = process.env.PORT || 8000;

	app.use(session({
		secret: 'session_secret',
		cookie: {
	        secure: false,
	        expires: false
	    },
		resave: true,
		saveUninitialized: true,
	  store: new RedisStore(config.redis)
	}));

	app.use(passportSession.passport.initialize());
	app.use(passportSession.passport.session());

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.engine('handlebars', exphbs());
	app.set('view engine', 'handlebars');
	app.set('trust proxy', 'loopback');


	// setup the logger and only log errors
	var accessLogStream = fs.createWriteStream(__dirname + 'InkOverFlow.log', 
		{ flags: 'a' });
	app.use(logger('combined', { stream: accessLogStream,
	    skip: function (req, res) { return res.statusCode < 400 } }));


	app.use(favicon(__dirname + '/assets/images/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser('session_secret'));
	app.use(express.static(path.join(__dirname, 'assets')));
	app.use(flash());

	// middleware to use for all requests
	app.all('*', function(req, res, next) {
	    console.log('request being processed');
	    next();
	});

	app.get('/auth/twitter', passportSession.passport.authenticate('twitter'));
	app.get('/auth/twitter/callback',
	  passportSession.passport.authenticate('twitter', {
	    successReturnToOrRedirect: '/', failureRedirect: '/login' })
	);

	app.get('/auth/google', passportSession.passport.authenticate('google',
	    { scope: [ 'profile', 'email', 'https://www.googleapis.com/auth/plus.me' ] })
	);
	app.get('/auth/google/callback', passportSession.passport.authenticate('google', {
	    successReturnToOrRedirect: '/', failureRedirect: '/login' })
	);

	app.get('/auth/facebook', passportSession.passport.authenticate('facebook',
	    { scope: ['email', 'public_profile', 'user_photos'], display: 'touch' }
	));
	app.get('/auth/facebook/callback', passportSession.passport.authenticate('facebook', {
	    successReturnToOrRedirect: '/', failureRedirect: '/login' })
	);

	app.post('/login', passportSession.passport.authenticate('local-login',
	  { failureRedirect: '/login',
	    failureFlash: 'Invalid username or password',
	    successRedirect: '/' }), function(req, res) {
	      res.redirect('/');
	});

	// process the signup form
    app.post('/signup', passportSession.passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	app.get('/logout',
	  function(req, res) {
	    req.logout();
	    res.redirect('/');
	});

	/*  Authenticate a route with
	    app.post('/api/post/addPost/', ensureAuthenticated, posts.addPost);
	*/

	// make user available in every template - middleware
	app.use(function(req, res, next) {
		res.locals.user = req.user;
		next();
	});

	// static pages routes
	app.get('/', index.index);
	app.get('/app', index.app);
	app.get('/login', index.login);
	app.get('/api', index.checkApi);

	app.get('/api/user/getUserById/:id/', user.getUserById);
	app.delete('/api/user/deleteUserById/:id/', user.deleteUserById);
	app.put('/api/user/updateUserById/:id/', user.updateUserById);

	app.post('/api/task/addTask/', tasks.addTask);
	app.get('/api/task/getTasks/', tasks.getTasks);
	app.get('/api/task/getTaskById/:id/', tasks.getTaskById);
	app.get('/api/task/getTasksByUserId/:id/', tasks.getTasksByUserId);
	app.delete('/api/task/deleteTaskById/:id/', tasks.deleteTaskById);
	app.put('/api/task/updateTaskById/:id/', tasks.updateTaskById);

	// 404 error handler
	app.get('*', function(req, res) {
	  res.render('404', 404);
	});

	if ( process.env.state == 'PRODUCTION' ) {
		// 500 error handler --> production only
		app.use(function(error, req, res, next) {
		    res.status(500);
		    res.render('500', { title:'500: Internal Server Error', error: error });
		});
	}

	// ensure request is application/json
	function ensureJSON(req, res, next) {
	    if ( ! req.is('application/json') ) {
	      res.status(400).json({ 'Error': 'Bad Request' });
	    } return next();
	}

	function ensureAuthenticated(req, res, next) {
	    if (req.isAuthenticated()) {
	        return next();
	    } res.redirect('/login');
	}

	module.exports = app;
	app.listen(port);
	console.log('Magic happens on port ' + port);
}
