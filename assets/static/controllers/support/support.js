angular.module('errandRunner')
  .controller('SupportController', function($scope, Support) {
    //.$promise
    $scope.addTicket = function() {
      Support.addTicket({ title: $scope.title, ticket: $scope.ticket, support_urgency: $scope.support_urgency })
        .then(function(result) {
          console.log(result);
          $scope.title = result.title;
          $scope.ticket = result.ticket;
          $scope.support_urgency = result.support_urgency;
        })
        .catch(function(response) {
          console.log(response);
          $scope.title = '';
          $scope.ticket = '';
          $scope.support_urgency = '';
        });
    };
  });
