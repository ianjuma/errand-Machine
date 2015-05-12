angular.module('errandRunner')
  .controller('PaymentController', function($scope, Payment) {
    //.$promise
    $scope.addPayment = function() {
      Payment.addPayment({ cardHolder: $scope.cardHolder,
        amount: $scope.amount, itemId: $scope.itemId })
        .then(function(result) {
          console.log(result);
          $scope.cardHolder = result.cardHolder;
          $scope.amount = result.amount;
          $scope.itemId = result.itemId;
        })
        .catch(function(response) {
          console.log(response);
          $scope.cardHolder = '';
          $scope.amount = '';
          $scope.itemId = '';
        });
    };
  });
