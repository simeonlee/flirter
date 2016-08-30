angular
  .module('userDetail')
  .component('userDetail', {
    // template: 'TODO: detailed view for <span>{{$ctrl.userId}}</span>',
    templateUrl: 'user-detail/user-detail.template.html',
    controller: ['User', '$routeParams',
      function UserDetailController(User, $routeParams) {
      	// var self = this;

      	// $http.get('sample-data/' + $routeParams.userId + '.json').then(function(response) {
      		// self.user = response.data;
      	// });
        // this.userId = $routeParams.userId;

        var self = this;
        self.user = User.get({userId: $routeParams.userId}, function(user) {
          self.setImage(user.imageUrl);
        });

        self.setImage = function(imageUrl) {
          self.mainImageUrl = imageUrl;
        }
      }
    ]
  });