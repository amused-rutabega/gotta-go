angular.module('gotta-go.layout', [])

.controller('LayoutController', function($scope, $state, $rootScope, Toilets) {
  $scope.$state = $state;

  // default values for the addtoilet view in index.html
  $scope.toilet = {
    ratings: {
      cleanliness: 1,
      ambiance: 1,
      accessibility: 1,
      privacy: 1,
      familyFriendliness: 1,
      free: true
    }
  };

  // Boolean to register when the spinner should spin
  $scope.submittingData = false;

  $scope.centerOnLocation = function () {
    $scope.map.panTo($scope.location);
  };

  // Pull up the addToilet state if is not the current state
  $scope.toggleLocator = function () {
    if (!$state.is('home.addToilet')) {
      $state.go('home.addToilet');
    } else {
      $state.go('home');
    }
  };

  // Handler for form submission of toilet to server
  $scope.addToilet = function () {
    $scope.toilet.position = $rootScope.center;

    $scope.submittingData = true;

    Toilets.add($scope.toilet)
    .then(function (data) { // when we receive a response
      $scope.submittingData = false;

      // add to the array of data to render
      $rootScope.toilets.push(data.toilet);
      // set state to default state to clear and unrender the form
      $state.go('home');
    });
  };
});
