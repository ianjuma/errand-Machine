var Comment = require('../models/comments');


exports.addComment = function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var new_comment = new Comment({
		id: req.body.id,
	    comment: req.body.comment,
	    user_id: req.body.user_id,
	});

	new_comment.save(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Comment Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'Comment Created'});
	    }
	});
};


exports.getCommentById = function(req, res) {

	Comment.get( req.params.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Comment Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Comment sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
		}
	});
};


exports.getComments = function(req, res) {

	Comment.orderBy( "comment_date" ).run(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Comment sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
	    }
	});
};


exports.deleteCommentById = function(req, res) {

	Comment.get( req.params.id ).delete().run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Comment Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Comment deleted');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json({ 'OK': 'Comment Deleted' });
		}
	});
};


exports.updateCommentById = function(req, res) {

	var _comment = new Comment({
	    comment: req.body.comment,
	});

	Comment.get( req.params.id ).update(_comment).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Comment Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Comment updated');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json(_comment);
		}
	});
};
