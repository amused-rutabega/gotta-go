angular.module('gotta-go.map', [])

.controller('MapController', function ($scope, uiGmapIsReady, $rootScope, Toilets, uiGmapGoogleMapApi) {
  var marker;

  // set default zoom value
  $rootScope.zoom = 16;
  // initialize toilets array so that map.html directive doesn't error out if server is slow to respond
  $rootScope.toilets = [];

  uiGmapGoogleMapApi.then(function () { // After the maps API loads
    // Use the GEO_DATA provided by the server
    if (GEO_DATA) {
      $rootScope.center = {
        latitude: GEO_DATA.ll[0],
        longitude: GEO_DATA.ll[1]
      };
    }
  });


  // TODO: Check to see if browser supports geolocation

  // Updates current location marker as geolocation updates
  navigator.geolocation.watchPosition(function (position) {
    // Update current user's position
    $rootScope.location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    if (marker) {
      // Redraw marker for the user's current location
      marker.setMap(null);

      marker = new MarkerWithLabel({
        position: $scope.location,
        icon: ' ',
        map: $scope.map,
        labelContent: '<i class="material-icons" style="color: #4285F4;">radio_button_checked</i>',
        labelAnchor: {x: 12, y: 8}
      });

      // Render on the map
      marker.setMap($scope.map);
    }
  }, null, {
    enableHighAccuracy: true,
    maximumAge: 2000 // Sets the time in which the browser is allowed to cache the position (at most this number of ms)
  });

  // Initialize rootScope vars location, center, map, creates the user location marker, and recenters the map
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

    uiGmapIsReady.promise().then(function (instances) {
      $rootScope.map = instances[0].map;

      // Draw marker for current users's position
      marker = new MarkerWithLabel({
        position: $scope.location,
        icon: ' ',
        map: $scope.map,
        labelContent: '<i class="material-icons" style="color: #4285F4;">radio_button_checked</i>',
        labelAnchor: {x: 12, y: 8}
      });

      $scope.map.panTo($scope.location); // Recenter map with accurate data
    });

    // request toilet data from server
    Toilets.get(position.coords.latitude,
      position.coords.longitude,
      750
    )
    .then(function (toilets) {
      $rootScope.toilets = toilets;
    });
  });
});
