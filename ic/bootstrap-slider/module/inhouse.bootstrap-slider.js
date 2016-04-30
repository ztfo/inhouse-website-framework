angular.module('inhouseApp')
.directive('bootstrapSlider', ['$filter', '$routeParams', '$timeout', function($filter, $routeParams, $timeout) {
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
				formatter: format
			});

			element.on('slideStop', function() {
				ngModelCtrl.$setViewValue($(this).slider('getValue').toString().replace(',', ';'));
				scope.$apply();
			});

			$timeout((function(scope, element, attrs) {
				return function() {
					if(typeof scope.filters[attrs.filter] !== 'undefined') {
						var val = scope.filters[attrs.filter];
						var range = val.split(';');
						$(element).slider('setValue', [parseInt(range[0].replace(/[^0-9]/, '')), parseInt(range[1].replace(/[^0-9]/, ''))]); //todo: check if this has 1 or no parameters!
					}
				};
			})(scope, element, attrs));
		},
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
}]);
