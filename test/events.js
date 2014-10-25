var should = require('should');
var request = require('supertest');
var winston = require('winston');


describe('Route', function() {
  var url = 'http://127.0.0.1:8000/api/event';

  before(function(done) {
    done();
  });

  describe('Events', function() {

    it('Should correctly add an Event', function(done) {
      var new_event = {
        id: "1",
        title: "Programming poetry",
        image: "Programming",
        description: "My musings on programming",
        venue: "Ihub",
        admin: "@IanJuma"
      };

      request(url)
        .post('/addEvent/')
        .send(new_event)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
    });

    it('Should return error - trying to save duplicate event', function(done) {
      var new_event = {
        id: "1",
        title: "Programming poetry",
        image: "Programming",
        description: "My musings on programming",
        venue: "Ihub",
        admin: "@IanJuma"
      };

      request(url)
      .post('/addEvent/')
      .send(new_event)
      .expect(400)
      .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
      });
    });

    it('Should correctly update an existing event', function(done) {
      var new_event = {
        title: "Programming Peotry with Python",
        image: "Programming on python",
        description: "My musings on programming",
        venue: "NaiLab",
        admin: "@IanJuma"
      };
      request(url)
      	.put('/updateEventById/1/')
      	.send(new_event)
        .expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err,res) {
      		if (err) {
      			throw err;
      		}
      		 res.body.should.have.property('title');
           res.body.should.have.property('image');
           res.body.should.have.property('description');
           res.body.should.have.property('venue');

      		 done();
      	});
      });

    it('Should correctly delete an existing Event', function(done) {

      request(url)
        .delete('/deleteEventById/1/')
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
