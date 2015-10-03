angular.module('gotta-go.layout', [])

.controller('LayoutController', function($scope, $state) {
  $scope.centerOnLocation = function () {
    $scope.map.panTo($scope.location);
  };

  $scope.toggleLocator = function () {
    $state.go('home.addToilet');
  };
});
