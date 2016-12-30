angular.module('ihframework')
.directive('ihListingLoader', ['$rootScope', '$routeParams', '$timeout', '$location', function($rootScope, $routeParams, $timeout, $location) {
	return {
		scope: {
			config: '@',
			classes: "@classes"
		},
		replace: true,
		templateUrl : function(el, attrs) {
			return 'build/templates/ic/listing-loader/template/' + (attrs.config || 's1') + '-inhouse.listing-loader.html';
		},
		controller: function($rootScope, $scope){
			$scope.agent = $rootScope.theUserData;
		},
		link: function(scope) {
		}
	};
}]);
