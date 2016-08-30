angular
	.module('core')
  .controller('MainController', function($scope) {
    $scope.$on('$viewContentLoaded', function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(geoposition) {
          var location = {
            lat: geoposition.coords.latitude,
            lng: geoposition.coords.longitude
          };
          console.log(location);
        }, function() {
          alert('Geolocation failed :(');
        });
      } else {
        alert('Your browser doesn\'t support geolocation :(');
      }
    })
  });