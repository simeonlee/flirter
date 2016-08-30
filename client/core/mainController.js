angular
	.module('core')
  .controller('MainController', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(geoposition) {
          $rootScope.userLocation = {
            lat: geoposition.coords.latitude,
            lng: geoposition.coords.longitude
          };
          // console.log($rootScope.location);
        }, function() {
          alert('Geolocation failed :(');
        });
      } else {
        alert('Your browser doesn\'t support geolocation :(');
      }
    })
  });