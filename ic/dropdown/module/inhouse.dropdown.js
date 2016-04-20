angular.module('inhouseApp')
.directive('ihDropdown', ['$routeParams', '$timeout', '$location', function($routeParams, $timeout, $location) {
	return {
		restrict: 'E',
		templateUrl : function(el, attrs) {
			return 'ic/dropdown/template/' + (attrs.config || 's1') + '-inhouse.dropdown.htm';
		},
		require: 'ngModel',
		transclude: true,
		scope: {
			'classes' : '@',
			'menuItems': '=items',
			'val' : '@name',
			'name' : '@name',
			'origName' : '@name',
			'dropdownId' : '@id',
			'truncate' : '@truncate'
		},
		link: function(scope, element, attrs, ngModelCtrl) {
			if(typeof attrs.class == 'undefined') {
				scope.classes = "ih-search-dropdown dropdown full";
			} else {
				scope.classes = attrs.class;
			}
			scope.$watch(function() {
				return ngModelCtrl.$modelValue;
			}, function(newVal) {
				scope.name = scope.origName;
				if(typeof newVal != 'undefined') {
					var display = typeof scope.truncate != 'undefined' && scope.truncate != '' ? newVal.substr(0,parseInt(scope.truncate)) : newVal;
					scope.name += ' | ' + display;
				}
			});
			$timeout((function(scope, element, attrs) {
				return function() {
					if(typeof scope.$parent.filters[attrs.id] !== 'undefined') {
						scope.val = scope.$parent.filters[attrs.id];
						scope.name = scope.origName + " | " + scope.val;
						ngModelCtrl.$setViewValue(scope.val);
					}
					element.find('a').each(function() {
						$(this).css('cursor', 'pointer');
					});
					element.find('a').click(function(event) {
						scope.val = $(this).attr('data-value');
						var display = typeof scope.truncate != 'undefined' && scope.truncate != '' ? $(this).attr('data-name').substr(0,parseInt(scope.truncate)) : $(this).attr('data-name');
						scope.name = scope.origName + " | " + display;
						ngModelCtrl.$setViewValue(scope.val);
					});
				};
			})(scope, element, attrs));
		}
	};
}]);
