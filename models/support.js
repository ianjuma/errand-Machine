var config = require('../config/database')
  , thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

// id as user_id
var Support = thinky.createModel('Support', {
    userId: String,
    title: String,
    ticket: String,
    support_urgency: {
        _type: String,
        default: 'NOTURGENT'
    },
    creation_date: {
    	_type: Date,
    	default: r.now()
    }
});


Support.ensureIndex('username');

module.exports = Support;