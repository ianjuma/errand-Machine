var slug = require('slug');
var Draft = require('../models/drafts');


exports.addDraft = function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var new_draft = new Draft({
		id: req.body.id,
	    title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    content: req.body.content,
	    author_id: req.body.idAuthor,
	    type: req.body.type
	});

	new_draft.save(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Draft Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'Draft Created'});
	    }
	});
};


exports.getDraftById = function(req, res) {

	Draft.get( req.params.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Draft Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Draft sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
		}
	});
};


exports.getDrafts = function(req, res) {

	Draft.orderBy( "creation_date" ).run(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Draft sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
	    }
	});
};


exports.deleteDraftById = function(req, res) {

	Draft.get( req.params.id ).delete().run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Draft Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Draft deleted');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json({ 'OK': 'Draft Deleted' });
		}
	});
};


exports.updateDraftById = function(req, res) {

	var _draft = new Draft({
	    title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    content: req.body.content,
	    type: req.body.type
	});

	Draft.get( req.params.id ).update(_draft).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Draft Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Draft updated');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json(_draft);
		}
	});
};

