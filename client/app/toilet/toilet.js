angular.module('gotta-go.toilet', [])

.controller('AddToiletController', function ($scope) {
  $scope.toilet = {
    ratings: {}
  };

  $scope.toiletOptions = {
    icon: ' ',
    // need to work on resizing this icon
    labelContent: '<i class="material-icons" style="color: #009688;">place</i>',
    labelClass: 'selectorMarker'
  };
});
