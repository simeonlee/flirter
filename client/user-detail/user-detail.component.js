angular
  .module('userDetail')
  .component('userDetail', {
    // template: 'TODO: detailed view for <span>{{$ctrl.userId}}</span>',
    templateUrl: 'user-detail/user-detail.template.html',
    controller: ['$http', '$routeParams',
      function UserDetailController($http, $routeParams) {
      	var self = this;

      	$http.get('sample-data/' + $routeParams.userId + '.json').then(function(response) {
      		self.user = response.data;
      	});
        // this.userId = $routeParams.userId;
      }
    ]
  });