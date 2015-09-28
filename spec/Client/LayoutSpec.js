describe('Layout', function () {
  var $scope, $rootScope, createController;

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
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('LayoutController', {
        $scope: $scope
      });
    };
  }));

  it('should have a method that centers the map on the current location of the user', function () {
    createController();

    expect($scope.centerOnLocation).to.exist;
    expect($scope.centerOnLocation).to.be.an.instanceOf(Function);
  });
});
