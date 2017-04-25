angular.module('ihframework')
.directive('ihLandingLayoutWrapper', [function($window) {
  return {
    scope: {
      'layout': '='
    },
    controller: ['$scope', '$element', function($scope, $element) {
    }],
    templateUrl: 'build/templates/ic/landing-layout/wrapper/landing-layout-wrapper.html',
    replace: true,
    restrict: 'E'
  };
}]);