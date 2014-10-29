var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Notification = thinky.createModel('Notifications', {
    username: String,
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
