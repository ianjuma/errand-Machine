var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Post = thinky.createModel('Posts', {
    id: String,
    title: String,
    _slug: {
      _type: String
    },
    content: String
});


// author_id -> primary key
var PostMetadata = thinky.createModel('PostMetadata', {
    id: String,
    author_id: String,
    type: String,
    creation_date: {
      _type: Date,
      default: r.now()
    },
    publish_date: {
      _type: Date,
      default: r.now()
    },
    last_updated_date: {
      _type: Date,
      default: r.now()
    },
    metadata: {
      reads: Number,
      likes: Number,
      comments_id: Number,
      time_to_read: Number
    }
});


// Post.hasOne(PostMetadata, "postmetadata", 'id', 'author_id');

PostMetadata.docAddListener('save', function(post) {
    console.log( "A new post has been saved" );
    console.log( "Saved post'id: " + post.id );
});

Post.docAddListener('save', function(post) {
    console.log( "A new post has been saved" );
    console.log( "Saved post'id: " + post.id );
});

PostMetadata.ensureIndex("_slug");
Post.ensureIndex("title");


module.exports = Post;
module.exports = PostMetadata;
