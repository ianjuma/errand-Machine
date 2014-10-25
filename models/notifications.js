var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);


var r = thinky.r;

var Notification = thinky.createModel('Notifications', {
    id: String,
    content: {
        title: String,
        content: String
    },
    notification_date: {
      _type: Date,
      default: r.now()
    }
});


module.exports = Notification;
