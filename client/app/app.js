angular.module('gotta-go', [
  'ui.router',
  'uiGmapgoogle-maps',
  'gotta-go.map',
  'gotta-go.layout',
  'gotta-go.services'
])

.config(['uiGmapGoogleMapApiProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider',
  function (GoogleMapApiProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/app/map/map.html',
        controller: 'MapController'
      })
      .state('addToilet', {
        url: '/toilet/add',
        templateUrl: '/app/layout/addtoilet.html',
        controller: 'LayoutController'
      });

    // .state('home', {
    //   url: '/',
    //   templateUrl: '/app/map/map.html',
    //   controller: 'MapController'
    // });

    GoogleMapApiProvider.configure({
      key: GOOGLE_API_KEY
    });
  }
]);
