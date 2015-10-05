angular.module('gotta-go.layout', [])

.controller('LayoutController', function($scope, $state, $rootScope, Toilets) {
  $scope.$state = $state;

  $scope.toilet = {
    ratings: {
      cleanliness: 1,
      ambiance: 1,
      accessability: 1,
      privacy: 1,
      familyFriendliness: 1,
      free: true
    }
  };

  $scope.centerOnLocation = function () {
    $scope.map.panTo($scope.location);
  };

  $scope.toggleLocator = function () {
    if (!$state.is('home.addToilet')) {
      $state.go('home.addToilet');
    } else {
      $state.go('home');
    }
  };

  $scope.addToilet = function () {
    $scope.toilet.position = $rootScope.center;

    Toilets.add($scope.toilet)
    .then(function (data) {
      $rootScope.toilets.push(data.toilet);
      $state.go('home');
    });
  };
});
