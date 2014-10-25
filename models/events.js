var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Event = thinky.createModel('Events', {
    id: String,
    title: String,
    _slug: {
      _type: String
    },
    image: String,
    description: String,
    venue: String,
    date: {
      _type: Date,
      default: r.now()
    },
    admin: String,
    metadata: {
      attending: Number,
      shares: Number,
      comments_id: Number,
      members: String
    }
});


Event.docAddListener('save', function(post) {
    console.log( "A new event has been saved" );
    console.log( "Saved event'id: " + post.id );
});

Event.ensureIndex("title");

module.exports = Event;
