var validator = require('validator');
var config = require("../config/database");

var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;


var Admin = thinky.createModel('Admins', {
    username: String,
    lname: String,
    fname: String,
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
    }
});


Admin.docAddListener('save', function(Admin) {
    console.log( "A new admin has been saved" );
});

Admin.ensureIndex("username");

module.exports = Admin;
