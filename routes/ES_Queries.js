var config = require("../config/database");
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client(config.elasticsearch);


exports.ping_search = function(req, res) {
  client.ping({
  requestTimeout: 1000,
  hello: "elasticsearch!"
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
      res.status(500).json({ "error": "ES blew up, fix it" });
    } else {
      console.log('All is well');
      res.status(200).json({ "OK": "All is Well" });
    }
  });
}


exports.elasticSearchPosts = function(req, res) {
 client.search({
  index: 'posts',
  type: 'post',
  body: {
    query: {
      match: {
        body: req.body.searchQuery
      }
    }
  }
  }).then(function (result) {
      res.status(200).json(result);
  }, function (err) {
      res.status(500).json({ "error": "something blew up, we're fixing it" });
  });
}


// search a post with some query in its body -- match with
exports.elasticSearchPostBody = function(req, res) {
 client.search({
  index: 'posts',
  type: 'post_body',
  body: {
    query: {
      match: {
        body: req.body.searchQuery
      }
    }
  }
  }).then(function (result) {
      res.status(200).json(result);
  }, function (err) {
      res.status(500).json({ "error": "something blew up, we're fixing it" });
  });
}


exports.elasticSearchUsers = function(req, res) {

  client.search({
    index: 'users',
    type: 'user',
    body: {
      query: {
        match: {
          body: req.body.searchQuery
        }
      }
    }
  }).then(function (result) {
    res.status(200).json(result);
  }, function (error) {
    res.status(500).json({ "error": "something blew up, we're fixing it" });
  });

}


exports.elasticSearchEvents = function(req, res) {

  client.search({
    index: 'events',
    type: 'event',
    body: {
      query: {
        match: {
          body: req.body.searchQuery
        }
      }
    }
  }).then(function (result) {
    res.status(200).json(result);
  }, function (error) {
    res.status(500).json({ "error": "something blew up, we're fixing it" });
  });

}


exports.elasticSearchEventByVenue = function(req, res) {

  client.search({
    index: 'events',
    type: 'place',
    body: {
      query: {
        match: {
          body: req.body.searchQuery
        }
      }
    }
  }).then(function (result) {
    res.status(200).json(result);
  }, function (error) {
    res.status(500).json({ "error": "something blew up, we're fixing it" });
  });

}
