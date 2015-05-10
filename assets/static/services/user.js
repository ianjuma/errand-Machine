angular.module('errandRunner')
  .factory('User', function($http) {
    return {
      getUser: function(_id) {
        return $http.get('/api/user', _id);
      },
      updateUser: function(_id) {
        return $http.put('/api/user', _id);
      },
      deleteUser: function(_id) {
        return $http.delete('/api/user', _id);
      }
    };
  });
