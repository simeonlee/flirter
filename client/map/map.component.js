angular
  .module('map')
  .component('map', {
    // template: 'TODO: detailed view for <span>{{$ctrl.userId}}</span>',
    templateUrl: 'map/map.template.html',
    controller: ['$http',
      function MapController($http) {
        this.location = {
          lat: 37.783697,
          lng: -122.408966
        };
        var self = this;
        $http.get('styles/mapStyle.json').then(function(response) {
          // self.mapStyle = response.data;
          var map = new google.maps.Map(document.getElementById('map'), {
            center: self.location,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: response.data,
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
          })

          var userIcon = new google.maps.MarkerImage('images/user/userIcon@2x.png', null, null, null, new google.maps.Size(40, 40))
          var userMarker = new google.maps.Marker({
            position: self.location,
            icon: userIcon,
            title: 'You',
            animation: google.maps.Animation.DROP
          });
          userMarker.setMap(map);
          userMarker.setAnimation(google.maps.Animation.BOUNCE);
        });
      }
    ]
  });