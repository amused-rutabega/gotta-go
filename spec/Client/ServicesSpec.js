describe('gotta-go', function () {
  beforeEach(module('gotta-go'));
  var $controller;
  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  describe('Factory: Toilets', function () {
    var toilets, $httpBackend, requestHandler;

    beforeEach(inject(function(Toilets) {
      toilets = Toilets;
    }));

    beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      requestHandler = $httpBackend.when('GET', '/api/toilets?latitude=37&longitude=-120&radius=3000')
      .respond([
        {
          id: 1, 
          postion: {
            latitude: 36, 
            longitude: -120
          }, 
          ratings: {
            Cleanliness: 5
          }
        },
        {
          id: 2, 
          postion: {
            latitude: 37,
            longitude: -121
          }, 
          ratings: {
            Cleanliness: 4
          }
        }
      ]);
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Toilets.get', function () {
      it('should be a function', function () {
        expect(toilets.get).to.be.an.instanceOf(Function);
      });

      xit('should make a get request with the correct params', function () {
        $httpBackend.expectGET('/api/toilets?latitude=37&longitude=-120&radius=3000');
        console.log(toilets.get);
        // toilets.get(37, -120, 3000).then(function (toilets) {
          
        // });
        $httpBackend.flush();
      });
      
    });

    describe('Toilets.add', function () {
      it('should be a function', function () {
        expect(toilets.add).to.be.an.instanceOf(Function);
      });
    });

    describe('Toilets.update', function () {
      it('should be a function', function () {
        expect(toilets.update).to.be.an.instanceOf(Function);
      });
    });

  });

});