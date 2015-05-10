angular.module('errandRunner')
  .factory('User', function($http) {
    return {
      save: function(User) {
        return $http.post('/api/user', { username: User.username, metric: User.metric,
          startDate: User.startDate, endDate: User.endDate, granularity: User.granularity });
      },
      getUser: function(_id) {
        return $http.get('/api/user', _id);
      },
      deleteUser: function(_id) {
        return $http.delete('/api/user', _id);
      }
    };
  });
