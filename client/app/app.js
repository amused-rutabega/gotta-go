angular.module('gotta-go', [
  'ui.router',
  'uiGmapgoogle-maps',
  'gotta-go.map',
  'gotta-go.layout',
  'gotta-go.toilet',
  'gotta-go.services'
])

.config(['uiGmapGoogleMapApiProvider', '$stateProvider', '$locationProvider',
  function (GoogleMapApiProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/app/map/map.html',
        controller: 'MapController'
      })
      .state('home.addToilet', {
        url: 'toilet/add',
        templateUrl: '/app/toilet/addtoilet.html',
        controller: 'AddToiletController'
      });

    // GOOGLE_API_KEY must be defined in .bash_profile for development SEE README
    GoogleMapApiProvider.configure({
      key: GOOGLE_API_KEY
    });
  }
]);
