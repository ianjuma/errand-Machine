var validator = require('validator')
  , config = require('../config/database')
  , thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;


var User = thinky.createModel('Users', {
    id: String,
    name: String,
    username: String,
    password: String,
    date_joined: {
      _type: Date,
      default: r.now()
    },
    email: {
        _type: String,
        default: '',
        // validator: validator.isEmail,
        enforce_type: 'strict'
    },
    profile_url: {
        _type: String,
        default: "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
    },
    provider: String
});


User.docAddListener('save', function(user) {
    console.log( 'A new user has been saved' );
    console.log( "Saved user'id: " + user.user_id );
});

User.ensureIndex('username');

module.exports = User;
