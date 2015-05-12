angular.module('errandRunner')
  .factory('User', function($http) {
    return {
      // TODO: clean getUser - dirty - on routers as well :(
      getUser: function() {
        return $http.get('/api/user');
      },
      updateUser: function(_id) {
        return $http.put('/api/user', _id);
      },
      deleteUser: function(_id) {
        return $http.delete('/api/user', _id);
      }
    };
  });
