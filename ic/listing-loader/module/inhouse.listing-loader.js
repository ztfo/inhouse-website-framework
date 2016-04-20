angular.module('inhouseApp')
.directive('ihListingLoader', ['$routeParams', '$timeout', '$location', function($routeParams, $timeout, $location) {
	return {
		scope: {
			config: '@',
			classes: "@classes"
		},
		replace: true,
		templateUrl : function(el, attrs) {
			return 'ic/listing-loader/template/' + (attrs.config || 's1') + '-inhouse.listing-loader.htm';
		},
		link: function(scope) {
			scope.agent = window.agentSettings;
		}
	};
}]);
