angular.module('ihframework')
.directive('ihListings', [function (inhouseApi, $timeout) {
  return {
    template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
    restrict: 'E',
    replace: true,
    scope: {
      classes: "@classes",
      config: '=',
      listing: '='
    },
    controller: function ($scope) {
      $scope.$watch('config', function(newVal) {
        if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/listings/template/' + $scope.config + '-listings.html';
        } else {
          $scope.templateUrl = 'build/templates/ic/listings/template/f1-listings.html';
        }
      });
    }
  };
}]);
