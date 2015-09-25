angular.module('gotta-go.map', [])

.controller('MapController', function ($scope, uiGmapGoogleMapApi) {
  // TODO: Check to see if browser supports geolocation
  navigator.geolocation.getCurrentPosition(function (position) {
    $scope.location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    $scope.map = {
      center: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      zoom: 16
    };

    uiGmapGoogleMapApi.then(function (maps) {
      var marker = $scope.location;
      marker.id = 1;
      marker.icon = {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      };
      $scope.markers = [marker];
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