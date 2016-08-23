angular.module('ihframework')
.directive('ihResources', function() {
	return {
		template: '<ng-include src="theUrl()"><ng-include>',
		scope: {
			classes: "@classes"
		},
		restrict: 'E',
		controller: function($rootScope, $scope){
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/resources/template/' + config + '-inhouse.resources.htm';
			};
		},
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
