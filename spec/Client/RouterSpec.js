// Test state `home` to render map view
// Test to see if it properly detects browser support for geolocation
// Test to see if we have the current coords of the user
// Test 

describe('Routing', function () {
  var $state;
  beforeEach(module('gotta-go'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  it('Should have "/" route', function () {
    expect($state.get('home')).to.be.ok();
  })

});