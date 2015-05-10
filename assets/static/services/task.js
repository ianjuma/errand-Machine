angular.module('errandRunner')
  .factory('Task', function($http) {
    return {
      addTask: function(Task) {
        return $http.post('/api/task', { name: Task.name, desc: Task.desc,
          dueDate: Task.dueDate, location: Task.location });
      },
      updateTask: function(_id) {
        return $http.put('/api/task', _id);
      },
      getTasks: function() {
        return $http.get('/api/task');
      },
      deleteTask: function(_id) {
        return $http.delete('/api/task', _id);
      }
    };
  });
