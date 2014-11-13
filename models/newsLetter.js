var config = require('../config/database')
  , thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var NewsLetter = thinky.createModel('NewsLetter', {
    id: String,
    metadata: {
       request_date: {
        _type: Date,
        default: r.now()
      }
    }
});

module.exports = NewsLetter;
