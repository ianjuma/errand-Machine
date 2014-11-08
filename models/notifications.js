var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

// id as user_id
var Notification = thinky.createModel('Notifications', {
    id: String,
    content: {
        _type: Array,
        default: "No Display"
    },
    metadata: {
       creation_date: {
        _type: Date,
        default: r.now()
      }
    }
});

Notification.docAddListener('save', function(notification) {
    console.log( "A new Notification has been saved" );
});

Notification.ensureIndex("username");

module.exports = Notification;
