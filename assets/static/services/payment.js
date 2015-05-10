angular.module('errandRunner')
  .factory('Payment', function($http) {
    return {
      addPayment: function(Pay) {
        return $http.post('/api/payment', { card: Pay.card, amount: Pay.amount });
      },
      getProgress: function(_id) {
        return $http.get('/api/payment', _id);
      }
    };
  });
