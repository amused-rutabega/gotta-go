angular.module('gotta-go.toilet', [])

.controller('AddToiletController', function ($scope) {
  $scope.toiletOptions = {
    icon: ' ',
    // need to work on resizing this icon
    labelContent: '<i class="material-icons" style="color: #009688;">place</i>',
    labelClass: 'selectorMarker',

    labelAnchor: '30 50',
    zIndex: 223 // Smallest number so that it is ontop of the current user position marker
  };
});
