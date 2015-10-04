angular.module('gotta-go.toilet', [])

.controller('AddToiletController', function ($scope, Toilets) {
  $scope.ready = false;

  $scope.toilet = {
    ratings: {}
  };

  $scope.toiletOptions = {
    icon: ' ',
    // need to work on resizing this icon
    labelContent: '<i class="material-icons" style="color: #009688;">place</i>',
    labelClass: 'selectorMarker'
  };

  $scope.showForm = function () {
    $scope.ready = true;
  };

  $scope.addToilet = function () {
    Toilets.add($scope.toilet)
    .then(function (data) {
      console.log(data);
    });
  };
});
