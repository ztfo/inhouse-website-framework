angular.module('ihframework')
.directive('ihAboutListing', function() {
	return {
		scope: {
			classes: "@classes"
		},
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		controller: function($scope) {
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/about-listing/template/' + config + '-inhouse.about-listing.htm';
			};
			$scope.agent = window.agentSettings;
		}
	};
});
