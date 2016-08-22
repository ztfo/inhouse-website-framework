angular.module('ihframework')
.directive('ihAbout', function($templateCache) {
	return {
		scope: {
			classes: "@classes"
		},
		templateUrl: 'build/templates/ic/about/template/s1-inhouse.about.htm',
		restrict: 'E',
		controller: function($scope, $rootScope, userData) {
			$scope.config = $rootScope.theWebsiteData;
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/about/template/' + config + '-inhouse.about.htm';
			};
			console.log(userData);
			$scope.agent = window.agentSettings;
		}
	};
});
