angular.module('gotta-go.layout', [])

.controller('LayoutController', function($scope, $rootScope) {
  $scope.centerOnLocation = function () {
    $scope.map.panTo($scope.location);
  };
});
