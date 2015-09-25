// jshint expr:true

// The above comment prevents jshint from complaing about functions that only contains expressions

describe('Routing', function () {
  var $state;
  beforeEach(module('gotta-go'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  it('should have "/" route', function () {
    expect($state.get('home')).to.be.ok;
  });

});