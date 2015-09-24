angular.module('gotta-go', [
  'uiGmapgoogle-maps',
  'gotta-go.map'  
])

.config(['uiGmapGoogleMapApiProvider',
  function (GoogleMapApiProvider) {
    GoogleMapApiProvider.configure({
      key: GOOGLE_API_KEY,
      libraries: 'visualization'
    });
  }
]);