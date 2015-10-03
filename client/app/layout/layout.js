angular.module('gotta-go.layout', [])

.controller('LayoutController', function($rootScope, $scope, $state, Toilets) {
  $scope.centerOnLocation = function () {
    $scope.map.panTo($scope.location);
  };

  $scope.toggleLocator = function () {
    $state.go('home.addToilet');
  };

  $scope.addToilet = function () {
    Toilets.add($scope.toilet)
    .then(function (data) {
      console.log(data);
    });
  };
});
