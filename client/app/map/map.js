angular.module('gotta-go.map', [])

.controller('MapController', function ($scope, uiGmapGoogleMapApi) {
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  
  uiGmapGoogleMapApi.then(function (maps) {

  });
});