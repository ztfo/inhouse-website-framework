angular.module('ihframework')
.directive('ihAmenities', function() {
	return {
		scope: {
			classes: "@classes"
		},
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		controller: function($scope) {
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/amenities/template/' + config + '-inhouse.amenities.htm';
			};
			$scope.agent = window.agentSettings;
		}
	};
});
