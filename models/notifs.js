var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

// id as user_id
var Notif = thinky.createModel('Notifs', {
    id: String,
    comment: String,
    metadata: {
       creation_date: {
        _type: Date,
        default: r.now()
      }
    },
    status: {
    	_type: String,
    	default: 'NOT_READ'
    }
});

Notif.docAddListener('save', function(notification) {
    console.log( "A new Notif has been saved" );
});

Notif.ensureIndex("username");

module.exports = Notif;
