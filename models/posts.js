var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Task = thinky.createModel('Tasks', {
    id: String,
    title: String,
    _slug: {
      _type: String
    },
    content: String
});


// author_id -> primary key
var TaskMetadata = thinky.createModel('TaskMetadata', {
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


// Task.hasOne(TaskMetadata, "Taskmetadata", 'id', 'author_id');

TaskMetadata.docAddListener('save', function(Task) {
    console.log( "A new Task has been saved" );
    console.log( "Saved Task'id: " + Task.id );
});

Task.docAddListener('save', function(Task) {
    console.log( "A new Task has been saved" );
    console.log( "Saved Task'id: " + Task.id );
});

TaskMetadata.ensureIndex("_slug");
Task.ensureIndex("title");


module.exports = Task;
module.exports = TaskMetadata;
