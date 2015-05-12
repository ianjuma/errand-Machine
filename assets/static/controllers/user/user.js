angular.module('errandRunner')
  .controller('UserController', function($scope, User) {
    //.$promise
    $scope.addUser = function() {
      User.save({ name: $scope.name, age: $scope.age, id: $scope.id })
        .then(function(result) {
          console.log(result);
          $scope.name = result.name;
          $scope.age = result.age;
          $scope.id = result.id;
          $scope.addForm.$setPristine();
        })
        .catch(function(response) {
          $scope.name = '';
          $scope.age = '';
          $scope.id = '';
          $scope.addForm.$setPristine();
        });
    };

    // TODO: scope this as well: as done above
    User.getUser()
      .then(function(result) {
        console.log(result);
        $scope.User = result.data;
      })
      .catch(function(response) {
        console.log(response);
        $scope.email = '';
        $scope.name = '';
        $scope.terms = '';
        $scope.profile_url = '';
      });
  });
