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
  var support = require('./routes/support');
  var tasks = require('./routes/tasks');
  var authentication = require('./routes/authentication');

  var port = process.env.PORT || 8000;
  var state  = process.env.NODE_ENV || 'development';
  var static_server = process.env.STATIC_SERVER || 'nginx';

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

  // setup the logger and only log errors
  var accessLogStream = fs.createWriteStream(__dirname + 'errandMachine.log',
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

  var checkRequest = {
    // ensure request is application/json
    ensureJSON : function ensureJSON(req, res, next) {
      if ( ! req.is('application/json') ) {
        res.status(400).json({ 'Error': 'Bad Request' });
      } return next();
    },
    ensureAuthenticated : function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } res.redirect('/login');
    }
  };


  // middleware to use for all requests
  app.all('*', function(req, res, next) {
    console.log('request being processed');
    next();
  });

  app.get('/auth/google', passportSession.passport.authenticate('google',
      { scope: [ 'profile', 'email', 'https://www.googleapis.com/auth/plus.me' ] })
  );
  app.get('/auth/google/callback', passportSession.passport.authenticate('google', {
      successReturnToOrRedirect: '/', failureRedirect: '/login' })
  );

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
  app.get('/login', index.login);
  app.get('/signup', index.signup);
  app.get('/passwordReset', index.forgotPass);

  // users API
  app.post('/api/user', checkRequest.ensureAuthenticated, users.addUser);
  app.get('/api/user', checkRequest.ensureAuthenticated, users.getUserById);
  app.delete('/api/user/:id', checkRequest.ensureAuthenticated, users.deleteUserById);
  app.put('/api/user/:id', checkRequest.ensureAuthenticated, users.updateUserById);


  // tasks API
  app.post('/api/task', checkRequest.ensureAuthenticated, tasks.addTask);
  app.get('/api/task', checkRequest.ensureAuthenticated, tasks.getTasksByUserId);
  app.get('/api/task/:id', checkRequest.ensureAuthenticated, tasks.getTaskById);
  app.delete('/api/task/:id', checkRequest.ensureAuthenticated, tasks.deleteTaskById);
  app.put('/api/task/:id', checkRequest.ensureAuthenticated, tasks.updateTaskById);

  // support API
  app.post('/api/support', checkRequest.ensureAuthenticated, support.addTicket);
  app.get('/api/support', checkRequest.ensureAuthenticated, support.getAllTickets);


  // 404 error handler
  // redirect 404 to app - handle with angular
  app.get('*', function(req, res) {
    res.redirect("/");
  });

  if ( process.env.state === state ) {
    // 500 error handler --> production only
    app.set('trust proxy', 'loopback');
    app.use(function(error, req, res) {
      res.status(500);
      res.render('500', { title:'500: Internal Server Error', error: error });
    });
  }

  module.exports = app;
  app.listen(port);
  console.log('Magic happens on port ' + port);
};
