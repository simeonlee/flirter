angular
  .module('flirterApp')
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      // $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/users', {
          template: '<user-list></user-list>'
        })
        .when('/users/:userId', {
          template: '<user-detail></user-detail>'
        })
        .when('/map', {
          template: '<map></map>'
        })
        .otherwise('/map');
    }
  ]);