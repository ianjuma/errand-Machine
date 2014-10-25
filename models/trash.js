var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Trash = thinky.createModel('Trash', {
    id: String,
    title: String,
    content: String,
    deleted_date: {
      _type: Date,
      default: r.now()
    },
    author_id: String,
    type: String,
    metadata: {
      likes: Number,
      shares: Number,
      comments_id: Number
    }
});


Trash.docAddListener('save', function(post) {
    console.log( "new Trash has been saved" );
    console.log( "Saved trash'id: " + post.id );
});

Trash.ensureIndex("title");


module.exports = Trash;
