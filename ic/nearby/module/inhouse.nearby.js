angular.module('inhouseApp')
.directive('ihAbout', function() {
	return {
		scope: {
			classes: "@classes"
		},
		templateUrl : function(el, attrs) {
			return 'ic/about/template/' + (attrs.config || 's1') + '-inhouse.about.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
