angular.module('inhouseApp')
.directive('ihResources', function() {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/resources/template/' + (attrs.config || 's1') + '-inhouse.resources.htm';
		},
		scope: {
			classes: "@classes"
		},
		restrict: 'E',
		link: function(scope, el, attrs) {
			scope.limit = attrs.limit || 3;
			scope.resources = window.agentSettings.content;
		}
	};
});
