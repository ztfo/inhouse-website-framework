angular.module('inhouseApp')
.directive('ihDivider', function() {
	return {
		scope: {
			classes: "@classes"
		},
		templateUrl : function(el, attrs) {
			return 'ic/divider/template/' + (attrs.config || 's1') + '-inhouse.divider.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
