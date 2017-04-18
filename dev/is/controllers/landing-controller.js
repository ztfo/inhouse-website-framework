angular.module('ihframework')
.controller('mainController', ['$scope', 'inhouseApi', '$rootScope', function($scope, inhouseApi, $rootScope) {
  $scope.filters = {};
  $scope.layout = $rootScope.theWebsiteData.landingLayout;

  $scope.searchTab = 'find';
  $scope.toggleSearchTabs = function(tab) {
    $scope.searchTab = tab;
  };

  $scope.$on('viewChanged', function(event, args) {
    $scope.controller = args;
  });
}]);
