angular.module('gotta-go.layout', [])

.controller('LayoutController', function($rootScope, $scope, $state, Toilets) {
  $scope.toilet = {
    position: $rootScope.center,
    ratings: {}
  };
  $scope.centerOnLocation = function () {
    $scope.map.panTo($scope.location);
  };

  $scope.toggleLocator = function () {
    //for later implementation
    // $rootScope.locatorVisible = true;
    // this will show a pin to slide map to toilet location
    // there will be an additional button created to render the inputView

    //for now we will render that view directly and assume that
    //the user is placing the new toilet at the current map center

    $state.go('home.addToilet');

  };

  $scope.addToilet = function () {
    Toilets.add($scope.toilet)
    .then(function (data) {
      console.log(data);
    });
  };
});
