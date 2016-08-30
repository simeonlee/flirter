// use module API to register a custom service using a factory function
// name of service is 'User'
// factory function is similar to a controller's constructor
// in that both can declare dependencies to be injected
// $resource is provided by ngResource module
// $resource makes it easy to create RESTful client
// can be used instead of lower-level $http service

angular
  .module('core.user')
  .factory('User', ['$resource',
    function($resource) {
      return $resource('sample-data/:userId.json', {}, {
        query: {
          method: 'GET',
          params: {userId: 'users.sample'},
          isArray: true
        }
      });
    }
  ]);