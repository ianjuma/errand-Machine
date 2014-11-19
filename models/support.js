var config = require('../config/database')
  , thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

// id as user_id
var Support = thinky.createModel('Support', {
    username: String,
    ticket: String,
    metadata: {
       creation_date: {
        _type: Date,
        default: r.now()
      }
    }
});


Support.ensureIndex('username');

module.exports = Support;
