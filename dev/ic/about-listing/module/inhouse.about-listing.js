angular.module('ihframework')
.directive('ihAboutListing', function() {
	return {
		scope: {
			classes: "@classes",
			listing: '=',
			config: '='
		},
		template: '<ng-include src="templateUrl"><ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope) {
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/about-listing/template/' + $scope.config + '-inhouse.about-listing.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/about-listing/template/p1-inhouse.about-listing.htm';
				}
			});
			$scope.agent = $rootScope.theUserData;
		}
	};
});
