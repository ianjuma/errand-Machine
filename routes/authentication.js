var oauthConfig = require('../config/auth');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var UserModel = require('../models/users');
var bcrypt = require('bcryptjs');


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
      email: profile.emails[0].value,
      gender: profile._json['gender']
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


passport.use(new LocalStrategy(
  function(username, password, done) {

    var user_info = {
      provider: 'local',
      username: username,
      password: password
    };

    UserModel.filter({ 'id': username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


exports.signup = function(req, res) {

  var hash = bcrypt.hashSync(req.body.password, oauthConfig.passwordSalt.salt);

  var new_user = new User({
      id: req.body.username,
      email: req.body.email,
      password: hash
  });

  new_user.save(function(error, result) {
    if (result == null) {
      res.status(400).json({ "Error": "User Already Exists" });
    }
      if (error) {
          res.status(500).json({ error: "something blew up, we're fixing it" });
      }
      else {
          console.log('User Saved');
          res.set({
            'Content-Type': 'application/json',
          });

          res.status(200).json({ 'OK': 'User Created'});
      }
  });
};


exports.passport = passport;
