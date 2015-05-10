angular.module('errandRunner')
  .factory('Support', function($http) {
    return {
      addTicket: function(Ticket) {
        return $http.post('/api/support', { UserId: User.id, urgency: Ticket.urgency,
          problem: Ticket.problem });
      },
      getTicket: function(_id) {
        return $http.get('/api/support', _id);
      },
      updateTicket: function(_id) {
        return $http.put('/api/support', _id);
      },
      deleteTicket: function(_id) {
        return $http.delete('/api/support', _id);
      }
    };
  });
