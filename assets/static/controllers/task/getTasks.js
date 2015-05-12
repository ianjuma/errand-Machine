angular.module('errandRunner')
  .controller('GetTasksController', function($scope, Task) {

    //.$promise
    // TODO: scope this as well: as done above
      Task.getTasks()
        .then(function (result) {
          console.log(result);
          $scope.Task = result.data;
        })
        .catch(function (response) {
          console.log(response);
          $scope.taskTitle = '';
          $scope.taskDescription = '';
          $scope.taskUrgency = '';
        });

  });