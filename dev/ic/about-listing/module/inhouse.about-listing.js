angular.module('ihframework')
.directive('ihAboutListing', function() {
	return {
		scope: {
			classes: "@classes"
		},
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope) {
			$scope.theUrl = function(config){
				config = 'p1';
				return 'build/templates/ic/about-listing/template/' + config + '-inhouse.about-listing.htm';
			};
			$scope.agent = $rootScope.theUserData;
		}
	};
});
