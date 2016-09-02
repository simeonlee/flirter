angular
  .module('flirterApp')
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      // $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/settings', {
          template: '<settings></settings>'
        })
        .when('/profile', {
          template: '<profile></profile>'
        })
        .when('/map', {
          template: '<map></map>'
        })
        .when('/users', {
          template: '<user-list></user-list>'
        })
        .when('/users/:userId', {
          template: '<user-detail></user-detail>'
        })
        .when('/login', {
          template: '<login></login>'
        })
        .otherwise('/map');
    }
  ]);