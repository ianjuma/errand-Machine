angular.module('errandRunner')
  .controller('TaskController', function($scope, Task) {
    //.$promise

    $scope.addTask = function() {
      Task.addTask({
        taskTitle: $scope.taskTitle, taskDescription: $scope.taskDescription,
        taskUrgency: $scope.taskUrgency
      })
        .then(function (result) {
          console.log(result);
          $scope.taskTitle = result.taskTitle;
          $scope.taskDescription = result.taskDescription;
          $scope.taskUrgency = result.taskUrgency;
        })
        .catch(function (response) {
          console.log(response);
          $scope.taskTitle = '';
          $scope.taskDescription = '';
          $scope.taskUrgency = '';
        });
    };

  });
