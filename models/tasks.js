var config = require('../config/database')
  , thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Task = thinky.createModel('Tasks', {
    userId: String,
    task_title: String,
    _slug: String,
    task_description: String,
    task_amount: {
        _type: String,
        default: '700'
    },
    progress: {
        _type: String,
        default: 'PENDING'
    },
    paid: {
        _type: String,
        default: 'UNPAID'
    },
    ratetask: String,
    task_urgency: {
        _type: String,
        default: ''
    },
    creation_date: {
        _type: Date,
        default: r.now()
    },
    metadata: {
      last_updated_date: {
        _type: Date,
        default: r.now()
      },
      started_date: {
        _type: String,
        default: r.now()
      },
      completion_date: {
        _type: Date
      }
    }
});

Task.docAddListener('save', function(Task) {
    console.log( 'A new Task has been saved' );
});

Task.ensureIndex('username');

module.exports = Task;
