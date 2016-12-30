angular.module('ihframework')
.factory('inhouseApiFactory', ['$http', '$rootScope', function($http, $rootScope) {

  var urlBase = 'api/v1';
  var inhouseApiFactory = {};

  inhouseApiFactory.getListing = function(listing) {
    return $http.get('https://eva-api.herokuapp.com/api/v1/web/user/' + $rootScope.theUserData.userId + '/listing/' + listing);
  };
  
  return inhouseApiFactory;
}]);
