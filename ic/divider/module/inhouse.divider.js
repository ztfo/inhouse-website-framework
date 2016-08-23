angular.module('ihframework')
.directive('ihDivider', function() {
	return {
		scope: {
			classes: "@classes"
		},
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		controller: function($scope) {
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/divider/template/' + config + '-inhouse.divider.htm';
			};
			$scope.agent = window.agentSettings;
		}
	};
});
