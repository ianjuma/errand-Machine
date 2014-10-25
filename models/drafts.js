var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Draft = thinky.createModel('Drafts', {
    id: String,
    title: String,
    _slug: {
      _type: String
    },
    content: String,
    creation_date: {
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


Draft.docAddListener('save', function(post) {
    console.log( "A new draft has been saved" );
    console.log( "Saved draft'id: " + post.id );
});

Draft.ensureIndex("title");

module.exports = Draft;
