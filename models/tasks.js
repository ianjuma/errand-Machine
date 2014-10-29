var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Task = thinky.createModel('Tasks', {
    task_id: String,
    username: String,
    task_title: String,
    locationData: String,
    task_description: String,
    contactPersons: String,
    due_date: Date,
    task_category: String,
    task_urgency: String,
    metadata: {
       creation_date: {
        _type: Date,
        default: r.now()
      },
      last_updated_date: {
        _type: Date,
        default: r.now()
      }
    }
});

Task.docAddListener('save', function(Task) {
    console.log( "A new Task has been saved" );
});

Task.ensureIndex("username");

module.exports = Task;
