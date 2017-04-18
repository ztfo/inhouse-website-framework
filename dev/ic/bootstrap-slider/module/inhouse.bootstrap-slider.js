angular.module('ihframework')
.directive('bootstrapSlider', ['$window', '$filter', '$routeParams', '$timeout', function($window, $filter, $routeParams, $timeout) {
  return {
    restrict: 'E',
    require: 'ngModel',
    transclude: true,
    link: function(scope, element, attrs, ngModelCtrl) {
      var format = (function(attrs) {
        return function(value) {
          if(attrs.filter == 'price') { // this could be expanded easily to support other filter types.
            if(typeof value == 'object') {
              return [
                $filter('currency')(value[0], '$', 0),
                $filter('currency')(value[1], '$', 0)
              ];
            } else {
              return $filter('currency')(value, '$', 0);
            }
          }
          return value;
        };
      })(attrs);

      $(element).slider({
        formatter: format,
        tooltip: 'always'
      });

      element.on('slideStop', function() {
        scope.val = $(this).slider('getValue').toString().replace(',', ';');
        ngModelCtrl.$setViewValue(scope.val);
        scope.$apply();
      });

      $timeout((function(scope, element, attrs) {
        return function() {
          $(element).css('display', 'inline');
          if(typeof scope.filters[attrs.filter] !== 'undefined') {
            var val = scope.filters[attrs.filter];
            var range = val.split(';');
            if(range.length > 1) {
              $(element).slider('setValue', [parseInt(range[0].replace(/[^0-9]/, '')), parseInt(range[1].replace(/[^0-9]/, ''))]); //todo: check if this has 1 or no parameters!
            }
          }
        };
      })(scope, element, attrs));
    },
    controller: function($rootScope, $scope) {
      $scope.agent = $rootScope.theUserData;
    }
  };
}]);
