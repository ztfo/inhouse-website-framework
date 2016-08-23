angular.module('ihframework')
.directive('ihAbout', function() {
	return {
		scope: {
			classes: "@classes"
		},
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		controller: function($scope, $rootScope, userData) {
			$scope.config = $rootScope.theWebsiteData;
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/about/template/' + config + '-inhouse.about.htm';
			};
			console.log(userData);
			$scope.agent = $rootScope.theUserData;
		}
	};
});
