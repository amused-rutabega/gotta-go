angular.module('gotta-go.services', [])

.factory('Toilets', function ($http) {
  return {
    get: function (latitude, longitude, radius) { //get toilet data objects from server
      return $http({
        method: 'GET',
        url: '/api/toilets' //we need the gps location and the desired radius here (?latitude=___?longitude=___?radius=___).
      })
      .then(function (response) {
        return response.data;
      });
    },

    add: function (toilet) { // add a new toilet to the db
      return $http({
        method: 'POST',
        data: toilet,
        url: '/api/toilets'
      })
      .then(function (response) {
        return response.data;
      });
    },

    update: function (toilet, id) { // add user opinion about an existing toilet
      return $http({
        method: 'PUT',
        data: toilet,
        url: '/api/toilets/' + id
      })
      .then(function (response) {
        return response.data;
      })
    }
  }
});