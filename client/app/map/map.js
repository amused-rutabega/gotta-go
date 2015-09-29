angular.module('gotta-go.map', [])

.controller('MapController', function ($scope, uiGmapIsReady, $rootScope, Toilets) {
  var marker;
  navigator.geolocation.watchPosition(function (position) {
    // Update current user's position
    $rootScope.location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    if (marker) {
      // Redraw marker for current user
      marker.setMap(null);

      marker = new MarkerWithLabel({
        position: $scope.location,
        icon: ' ',
        map: $scope.map,
        labelContent: '<i class="material-icons" style="color: #4285F4;">radio_button_checked</i>'
      });

      marker.setMap($scope.map);
    }
  }, null, {
    enableHighAccuracy: true,
    maximumAge: 2000 // Sets the time in which the browser is allowed to cache the position (at most this number of ms)
  });

  // TODO: Check to see if browser supports geolocation
  navigator.geolocation.getCurrentPosition(function (position) {
    // The current user's location
    $rootScope.location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    // The point to have the camera center on
    $rootScope.center = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    $rootScope.zoom = 16;

    uiGmapIsReady.promise().then(function (instances) {
      $rootScope.map = instances[0].map;

      // Draw marker for current users's position
      marker = new MarkerWithLabel({
        position: $scope.location,
        icon: ' ',
        map: $scope.map,
        labelContent: '<i class="material-icons" style="color: #4285F4;">radio_button_checked</i>'
      });
    });

    Toilets.get(position.coords.latitude, 
      position.coords.longitude, 
      3000 /* About half a mile */
    )
    .then(function (toilets) {
      $scope.toilets = toilets;
    });

    // Dummy data for toilet markers
    // $scope.toilets = [
    //   {
    //     id: 0,
    //     coords: {
    //       latitude: 37.7827097,
    //       longitude: -122.4080675
    //     }
    //   },
    //   {
    //     id: 1,
    //     coords: {
    //       latitude: 37.7847097,
    //       longitude: -122.4080675
    //     }
    //   },
    // ];
  });
});
