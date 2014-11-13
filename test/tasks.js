var should = require('should')
  , request = require('supertest')
  , winston = require('winston');


describe('Route', function() {
  var url = 'http://127.0.0.1:8000';

  before(function(done) {
    done();
  });

  describe('User', function() {

    it('Should correctly add a User', function(done) {
      var user_info = {
        username: 'test',
        email: 'test@test.com',
        name: 'test',
        id: '1'
      };

      request(url)
        .post('/api/user/addUser/')
        .send(user_info)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
    });

    it('Should return error - trying to save duplicate username', function(done) {
      var user_info = {
        username: 'test',
        email: 'test@test.com',
        name: 'test',
        id: '1'
      };

      request(url)
      .post('/api/user/addUser/')
      .send(user_info)
      .expect(400)
      .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
      });
    });

    it('Should correctly update an existing account', function(done) {
      var user_info = {
      	email: 'test2@test.com',
      	name: 'test2',
      };
      request(url)
      	.put('/api/user/updateUser/1/')
      	.send(user_info)
        .expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err,res) {
      		if (err) {
      			throw err;
      		}
      		 res.body.should.have.property('name');
      		 done();
      	});
      });

    it('Should correctly delete an existing account', function(done) {

      request(url)
        .delete('/api/user/deleteUser/1/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
      });

  });

  describe('Post', function() {

    it('Should correctly add a Post', function(done) {
      var post_info = {
        "id": "1",
        "title": "Ian",
        "content": "ian new post",
        "author_id": "1"
      };

      request(url)
        .post('/api/post/addPost/')
        .send(post_info)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
    });


    it('Should correctly get a Post By ID', function(done) {

      request(url)
        .get('/api/post/getPost/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
    });

    it('Should return error - trying to save duplicate Post', function(done) {
      var post_info = {
        "id": "1",
        "title": "Ian",
        "content": "ian new post",
        "author_id": "1"
      };

      request(url)
      .post('/api/post/addPost/')
      .send(post_info)
      .expect(400)
      .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
      });
    });

    it('Should correctly update an existing Post', function(done) {
      var post_info = {
        "title": "Ian",
        "content": "ian new post",
        "author_id": "1"
      };
      request(url)
        .put('/api/post/updatePost/1/')
        .send(post_info)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           res.body.should.have.property('title');
           done();
        });
      });

    it('Should correctly delete an existing Post', function(done) {

      request(url)
        .delete('/api/post/deletePost/1/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
      });

  });


});
