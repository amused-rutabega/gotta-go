angular.module('gotta-go.map', [])

.controller('MapController', function ($scope, uiGmapIsReady, $rootScope) {
  var marker;
  navigator.geolocation.watchPosition(function (position) {
    $rootScope.location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    if (marker) {
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
    maximumAge: 2000
  });

  // TODO: Check to see if browser supports geolocation
  navigator.geolocation.getCurrentPosition(function (position) {
    $rootScope.location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    $rootScope.center = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    $rootScope.zoom = 16;

    uiGmapIsReady.promise().then(function (instances) {
      $rootScope.map = instances[0].map;

      marker = new MarkerWithLabel({
        position: $scope.location,
        icon: ' ',
        map: $scope.map,
        labelContent: '<i class="material-icons" style="color: #4285F4;">radio_button_checked</i>'
      });
    });

    $scope.toilets = [
      {
        id: 0,
        coords: {
          latitude: 37.7827097,
          longitude: -122.4080675
        }
      },
      {
        id: 1,
        coords: {
          latitude: 37.7847097,
          longitude: -122.4080675
        }
      },
    ];
  });
});
