angular.module('gotta-go', ['uiGmapgoogle-maps'])

.config(['uiGmapGoogleMapApiProvider',
  function (GoogleMapApiProvider) {
    GoogleMapApiProvider.configure({
      key: GOOGLE_API_KEY,
      libraries: 'visualization'
    });
  }
]);