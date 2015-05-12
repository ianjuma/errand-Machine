angular.module('errandRunner')
  .factory('Payment', function($http) {
    return {
      addPayment: function(Pay) {
        return $http.post('/api/payment', { cardHolder: Pay.cardHolder, amount: Pay.amount,
          itemId: Pay.itemId });
      },
      getProgress: function(_id) {
        return $http.get('/api/payment', _id);
      }
    };
  });
