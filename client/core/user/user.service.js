angular
  .module('core.user')
  .factory('User', ['$resource',
    function($resource) {
      return $resource('sample-data/:userId.json', {}, {
        query: {
          method: 'GET',
          params: {userId: 'users'},
          isArray: true
        }
      });
    }
  ]);