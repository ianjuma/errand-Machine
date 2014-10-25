var oauthConfig = require('../config/auth');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var UserModel = require('../models/users');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  UserModel.filter({ 'id': user.id }).run(function(err, user) {
    if (err) { console.log(err); done(err); }
    if (!err && user != null && user != '' && user != '[]' && user != [] ) {
      done(null, user);
    }
  });
});


passport.use(new TwitterStrategy(oauthConfig.twitterAuth,
  function(token, tokenSecret, profile, done) {

    var user_info = {
      id: String(profile.username),
      username: profile.username,
      name: profile.displayName,
      provider: profile.provider,
      location: profile._json.location,
      profile_url: profile.photos[0].value
    }

    UserModel.filter({ 'id': String(profile.username) }).run(function(err, user) {
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
      provider: profile.provider,
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


exports.passport = passport;
