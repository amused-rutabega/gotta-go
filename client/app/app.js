angular.module('gotta-go', [
  'ui.router',
  'uiGmapgoogle-maps',
  'gotta-go.map'  
])

.config(['uiGmapGoogleMapApiProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider',
  function (GoogleMapApiProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/app/map/map.html',
        controller: 'MapController'
      });

    // .state('home', {
    //   url: '/',
    //   templateUrl: '/app/map/map.html',
    //   controller: 'MapController'
    // });

    GoogleMapApiProvider.configure({
      key: GOOGLE_API_KEY,
      libraries: 'visualization'
    });
  }
]);