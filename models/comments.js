var config = require(__dirname + "../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Comment = thinky.createModel('Comments', {
    id: String,
    comment: {
        _type: String
    },
    user_id: String,
    comment_date: {
      _type: Date,
      default: r.now()
    }
});


module.exports = Comment;
