var validator = require('validator')
  , config = require('../config/database')
  , thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;


var Admin = thinky.createModel('Admins', {
    username: String,
    lname: String,
    fname: String,
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
    }
});


Admin.docAddListener('save', function(Admin) {
    console.log( 'A new admin has been saved' );
});

Admin.ensureIndex('username');

module.exports = Admin;
