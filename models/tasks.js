var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Task = thinky.createModel('Tasks', {
    username: String,
    task_title: String,
    _slug: String,
    author_id: String,
    task_description: String,
    due_date: Date,
    progress: {
        _type: String,
        default: 'PENDING'
    },
    paid: String,
    task_urgency: String,
    metadata: {
       creation_date: {
        _type: Date,
        default: r.now()
      },
      last_updated_date: {
        _type: Date,
        default: r.now()
      },
      completion_date: {
        _type: Date
      }
    }
});

Task.docAddListener('save', function(Task) {
    console.log( "A new Task has been saved" );
});

Task.ensureIndex("username");

module.exports = Task;
