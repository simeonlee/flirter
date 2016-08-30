angular
  .module('flirterApp')
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      // $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/map', {
          template: '<map></map>'
        })
        .when('/settings', {
          template: '<settings></settings>'
        })
        .when('/users', {
          template: '<user-list></user-list>'
        })
        .when('/users/:userId', {
          template: '<user-detail></user-detail>'
        })
        .otherwise('/map');
    }
  ]);