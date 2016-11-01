angular.module('ihframework')
.directive('ihAboutListing', function() {
	return {
		scope: {
			classes: "@classes",
			listing: '=',
			config: '='
		},
		template: '<ng-include src="templateUrl" class="{{classes}}"></ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope) {
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/about-listing/template/' + $scope.config + '-inhouse.about-listing.html';
				} else {
					$scope.templateUrl = 'build/templates/ic/about-listing/template/p1-inhouse.about-listing.html';
				}
			});
			$scope.agent = $rootScope.theUserData;
		}
	};
});
