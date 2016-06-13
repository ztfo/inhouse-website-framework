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
			var resources = [];
			var featured = [];
			//loop through resources to see if any are featured
			for (var i = 0; i < window.agentSettings.content.length; i++) {
				if(typeof window.agentSettings.content[i].featured !== 'undefined' && window.agentSettings.content[i].featured === true) {
					featured.push(window.agentSettings.content[i]);
				} else {
					resources.push(window.agentSettings.content[i]);
				}
			}
			scope.resources = featured.concat(resources);
		}
	};
});
