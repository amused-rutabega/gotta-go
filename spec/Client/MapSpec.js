// Test to see if it properly detects browser support for geolocation

describe('Map', function () {
  var $scope, $rootScope, uiGmapGoogleMapApi, createController;

  before(function () {
    if (!navigator.geolocation) {
      navigator.geolocation = {
        getCurrentPosition: function () {},
        watchPosition: function () {}
      };
    }
  });

  beforeEach(module('gotta-go'));

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');

    uiGmapGoogleMapApi = $injector.get('uiGmapGoogleMapApi');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('MapController', {
        $scope: $scope,
        uiGmapGoogleMapApi: uiGmapGoogleMapApi
      });
    };
  }));

  it('should get the current coordinates of the user', function () {
    var original = navigator.geolocation.getCurrentPosition;

    var position;

    navigator.geolocation.getCurrentPosition = function (cb) {
      position = {
        coords: {
          latitude: 40,
          longitude: -100
        }
      };

      cb(position);
    };

    createController();

    expect($scope.location.lat).to.eql(position.coords.latitude);
    expect($scope.location.lng).to.eql(position.coords.longitude);

    navigator.geolocation.getCurrentPosition = original;
  });

  it('should update when the current coordinates of the user change', function () {
    var position;

    navigator.geolocation.getCurrentPosition = function (cb) {
      position = {
        coords: {
          latitude: 40,
          longitude: -100
        }
      };

      cb(position);
    };

    createController();

    original = navigator.geolocation.watchPosition;

    navigator.geolocation.watchPosition = function (cb) {
      position = {
        coords: {
          latitude: 41,
          longitude: -101
        }
      };

      cb(position);

      expect($scope.location.lat).to.eql(41);
      expect($scope.location.lng).to.eql(-101);
    };

    navigator.geolocation.getCurrentPosition = original;
  });
});
