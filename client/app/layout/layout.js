angular.module('gotta-go.layout', [])

.controller('LayoutController', function($scope) {
  $scope.centerOnLocation = function () {
    $scope.map.panTo($scope.location);
  };
});
