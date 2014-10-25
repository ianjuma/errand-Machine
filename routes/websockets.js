var Post = require('../models/posts');
var User = require('../models/users');


/*
// if a response is needed - format
exports.NewNotifications = function(io) {
  return function (req, res) {

  }
};

trigger on new notification
send through socket - to client

io.sockets.emit('hello', { msg:'abc' });
*/


exports.newNotifications = function(io) {

  io.on('connection', function (socket) {
    // when the client emits 'new notification', this listens and executes
    socket.on('new notification', function (data) {
      // we tell the client to execute 'new notification'
      socket.broadcast.emit('new notification', {
        username: socket.username,
        content: data
      });
    });

    socket.on('writing', function () {
      socket.broadcast.emit('writing', {
        username: socket.username
      });
    });

  });
};
