var oauthConfig = require('../config/auth')
  , passport = require('passport')
  , bcrypt = require('bcryptjs')
  , UserModel = require('../models/users');


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  UserModel.get( user[0].id ).run(function(err, user) {
    if (err) { console.log(err); done(err); }
    if (!err && user != null && user != '' && user != '[]' && user != [] ) {
      done(null, user);
    }
  });
});


passport.use(new GoogleStrategy(oauthConfig.googleAuth,
  function(accessToken, refreshToken, profile, done) {

    // console.log(profile);
    var user_info = {
      id: String(profile.emails[0].value),
      username: (profile.name.familyName + profile.name.givenName),
      name: profile.displayName,
      profile_url: profile._json['picture'],
      provider: profile.provider,
      email: profile.emails[0].value
    };

    UserModel.filter({ 'id': String(profile.emails[0].value) }).run(function(err, user) {
      if (err) { console.log(err); }
      if (!err && user != null && user != '' && user != '[]' && user != [] ) {
        done(null, user);
      } else {
        UserModel.save( user_info, function(err, user) {
          if (err) {
            return done(err);
          } else {
            done(null, user);
          }
        });
      }
    });
  }
));


passport.use(new FacebookStrategy(oauthConfig.facebookAuth,
  function(accessToken, refreshToken, profile, done) {

    // console.log(profile);
    var user_info = {
      id: String(profile.id),
      username: (profile._json.last_name + profile._json.first_name),
      name: profile.displayName,
      email: profile.emails[0].value,
      profile_url: profile.photos[0].value,
      provider: profile.provider
    };

    UserModel.filter({ 'id': String(profile.id) }).run(function(err, user) {
      if (err) { console.log(err); }
      if (!err && user != null && user != '' && user != '[]' && user != [] ) {
        done(null, user);
      } else {
        UserModel.save( user_info, function(err, user) {
          if (err) {
            return done(err);
          } else {
            done(null, user);
          }
        });
      }
    });
  }
));


passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
  function(req, email, password, done) {

    var hash = bcrypt.hashSync(password, oauthConfig.passwordSalt.salt);

    UserModel.filter({ 'id' :  String(email) }).run(function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);
        // if no user is found, return the message
        if (!user)
            return done(null, false, req.flash('loginMessage', 'Sorry, wrong email.'));

        // if the user is found but the password is wrong
        if (!user.validPassword( hash ))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

        // all is well, return successful user
        return done(null, user);
    });
}));


passport.use('local-signup', new LocalStrategy({
    // local strategy uses username and password, override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // pass back the entire request to the callback
},
  function(req, email, password, done) {
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
    // find a user whose email is the same as the forms email
    UserModel.filter({ 'id' :  String(email) }).run(function(err, user) {
        if (err) {
            return done(err);
        }
        // check to see if theres already a user with that email
        else if (user != '' && user != '[]' && user != undefined) {
            console.log("USER -> " + user);
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

            // if there is no user -> create the user
            var new_user = {
              id: email,
              password: bcrypt.hashSync(password, oauthConfig.passwordSalt.salt),
              profile_url: "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon",
              provider: 'local'
            };
            console.log(new_user);
            UserModel.save( new_user, function(err, user) {
              if (err) {
                return done(err);
              } else {
                done(null, user);
              }
            });
        }
    });
    });
}));


exports.passport = passport;
