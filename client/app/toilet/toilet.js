angular.module('gotta-go.toilet', [])

.controller('AddToiletController', function ($scope) {
  $scope.toiletOptions = {
    // we don't want an icon since we will use a material icon as the label
    icon: ' ',

    // this creates a material location svg icon
    labelContent: '<i class="material-icons" style="color: #009688;">place</i>',
    labelClass: 'selectorMarker',

    // labelAnchor expects a string with an x and y offset in pixels separated by white space
    labelAnchor: '30 50',
    zIndex: 9999999999999 // Large number so that it is always ontop of the current user position marker
  };
});
