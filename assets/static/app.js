angular.module('errandRunner', ['ngResource', 'ngMessages', 'ngRoute', 'ngAnimate', 'mgcrea.ngStrap'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'static/views/mytasks.html',
        controller: 'GetTasksController'
      })
      .when('/new', {
        templateUrl: 'static/views/newtask.html',
        controller: 'TaskController'
      })
      .when('/payment', {
        templateUrl: 'static/views/payment.html',
        controller: 'PaymentController'
      })
      .when('/profile', {
        templateUrl: 'static/views/myaccount.html',
        controller: 'UserController'
      })
      .when('/support', {
        templateUrl: 'static/views/support.html',
        controller: 'SupportController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
