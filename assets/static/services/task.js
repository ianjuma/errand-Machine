angular.module('errandRunner')
  .factory('Task', function($http) {
    return {
      addTask: function(Task) {
        return $http.post('/api/task', { taskTitle: Task.taskTitle, taskDescription: Task.taskDescription,
          taskUrgency: Task.taskUrgency });
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
