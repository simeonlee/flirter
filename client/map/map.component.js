angular
  .module('map')
  .component('map', {
    // template: 'TODO: detailed view for <span>{{$ctrl.userId}}</span>',
    templateUrl: 'map/map.template.html',
    controller: ['$http', '$scope', '$rootScope', 'User',
      function MapController($http, $scope, $rootScope, User) {

        $rootScope.self = User.self.query();
        console.log($rootScope.self);

        this.location = {
          lat: 37.783697,
          lng: -122.408966
        };
        
        console.log('userLocation from $rootScope: ', $rootScope.userLocation);
        var self = this;
        $http.get('styles/mapStyle.json').then(function(response) {
          // self.mapStyle = response.data;
          var map = new google.maps.Map(document.getElementById('map'), {
            center: $rootScope.userLocation || self.location,
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
          $rootScope.userMarker = new google.maps.Marker({
            position: self.location,
            icon: userIcon,
            title: 'You',
            animation: google.maps.Animation.DROP
          });
          $rootScope.userMarker.setMap(map);
          $rootScope.userMarker.setAnimation(google.maps.Animation.BOUNCE);

          // listen for user location determination and re-set center of map
          $scope.$watch(function() {
            return $rootScope.userLocation;
          }, function() {
            console.log('userLocation from $rootScope: ', $rootScope.userLocation);            // map.setCenter($rootScope.userLocation)
            // var userIcon = new google.maps.MarkerImage('images/user/userIcon@2x.png', null, null, null, new google.maps.Size(40, 40))
            // var userMarker = new google.maps.Marker({
            //   position: $rootScope.userLocation,
            //   icon: userIcon,
            //   title: 'You',
            //   animation: google.maps.Animation.DROP
            // });
            // userMarker.setMap(map);
            // userMarker.setAnimation(google.maps.Animation.BOUNCE);
          }, true);

        });

        this.shout = function() {
          // Set infowindow content
          var iwContent =
            '<div class="iw">'+
              '<img src="'+$rootScope.self.coverPhotoUrl+'" class="iw-cover-photo" />'+
              '<img src="'+$rootScope.self.profileImageUrl+'" class="iw-profile-image" />'+
              '<div class="iw-message">'+this.shoutedMessage+'</div>'+
              '<div class="iw-time">'+new Date()+'</div>'+
              '<div class="iw-preference">'+
                '<div class="iw-like">'+
                  '<img src="/images/heart/heart@2x.png" class="iw-like-image">'+
                '</div>'+
                '<div class="iw-dislike">'+
                  '<img src="/images/dislike/dislike@2x.png" class="iw-dislike-image">'+
                '</div>'+
              '</div>'+
            '</div>';
          var infowindow = new google.maps.InfoWindow({
            content: iwContent,
            disableAutoPan: true, // prevent map from moving around to each infowindow - spastic motion
            maxWidth: 200 // width of the card - also change .gm-style-iw width in css
          });

          // Attach to marker variable
          $rootScope.userMarker.infowindow = infowindow;
          
          // .open sets the infowindow upon the map
          $rootScope.userMarker.infowindow.open(map, $rootScope.userMarker);
          
          this.shoutedMessage = '';

          console.log($rootScope.userLocation);

          // About 'state':
          // true = 'I am currently open'
          // false = 'I am currently not open'
          // marker.infowindow.state = true;

          // Add custom bounce / infowindow close listener to marker
          // marker.addToggle();    

          // Add custom styling to the Google infowindow to differentiate our app
          google.maps.event.addListener(infowindow, 'domready', function() {

            // This is the <div> which receives the infowindow contents
            var iwOuter = $('.gm-style-iw');

            // The <div> we want to change is above the .gm-style-iw <div>
            var iwBackground = iwOuter.prev();

            // Remove the background shadow <div>
            iwBackground.children(':nth-child(2)').css({'display' : 'none'});

            // Remove the white background <div>
            iwBackground.children(':nth-child(4)').css({'display' : 'none'});

            // Move the infowindow to the right.
            // iwOuter.parent().parent().css({left: '25px'});

            // Move the shadow of the arrow 76px to the left margin 
            // iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: -25px !important;'});
            iwBackground.children(':nth-child(1)').css({'display': 'none'});

            // Move the arrow 76px to the left margin 
            // iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: -25px !important;'});

            // Change color of tail outline
            // The outline of the tail is composed of two descendants of <div> which contains the tail
            // The .find('div').children() method refers to all the <div> which are direct descendants of the previous <div>
            iwBackground.children(':nth-child(3)').find('div').children().css({'display': 'none'});
            // iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(140, 140, 140, 0.6) 0px 1px 6px', 'z-index' : '1'});
            // iwBackground.children(':nth-child(3)').find('div').children().css({
            //   'box-shadow': 'none !important',
            //   'background': 'none !important',
            //   'z-index' : '1'
            // });

            // This <div> groups the close button elements
            var iwCloseBtn = iwOuter.next();

            // iwCloseBtn.css({
            //   opacity: '1.0', // by default the close button has an opacity of 0.7
            //   position: 'absolute',
            //   right: '62px', top: '24px', // button repositioning
            //   content: 'url("client/images/closebutton@2x.png")',
            //   height: '15px', width: '15px'
            // });

            // Google API automatically applies 0.7 opacity to the button after the mouseout event.
            // This function reverses this event to the desired value.
            // iwCloseBtn.mouseout(function(){
            //   $(this).css({opacity: '1.0'});
            // });

            // Remove close button
            iwCloseBtn.css({'display': 'none'});

          });
        }
      }
    ]
  });