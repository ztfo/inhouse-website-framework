angular.module('ihframework')
.directive('ihNearby', function() {
	return {
		scope: {
			classes: "@classes"
		},
		templateUrl : function(el, attrs) {
			return 'ic/nearby/template/' + (attrs.config || 's1') + '-inhouse.nearby.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
