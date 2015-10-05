angular.module('gotta-go.toilet', [])

.controller('AddToiletController', function ($scope) {
  $scope.toiletOptions = {
    icon: ' ',

    labelContent: '<i class="material-icons" style="color: #009688;">place</i>',
    labelClass: 'selectorMarker',

    labelAnchor: '30 50',
    zIndex: 9999999999999 // Large number so that it is always ontop of the current user position marker
  };
});
