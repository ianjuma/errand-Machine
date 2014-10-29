var validator = require('validator');
var config = require("../config/database");

var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;


var User = thinky.createModel('Users', {
    id: String,
    lname: String,
    fname: String,
    username: String,
    dob: Date,
    password: String,
    date_joined: {
      _type: Date,
      default: r.now()
    },
    email: {
        _type: String,
        default: "",
        // validator: validator.isEmail,
        enforce_type: "strict"
    },
    profile_url: {
        _type: String
    },
    provider: String
});


User.docAddListener('save', function(user) {
    console.log( "A new user has been saved" );
    console.log( "Saved user'id: " + user.user_id );
});

User.ensureIndex("username");

module.exports = User;
