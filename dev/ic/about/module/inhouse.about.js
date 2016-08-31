angular.module('ihframework')
.directive('ihAbout', function() {
	return {
		scope: {
			classes: "@classes",
			config: '='
		},
		template: '<ng-include src="templateUrl"><ng-include>',
		restrict: 'E',
		controller: function($scope, $rootScope, userDataService) {
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/about/template/' + newVal + '-inhouse.about.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/about/template/s1-inhouse.about.htm';
				}
			});
			
			$scope.agent = $rootScope.theUserData;
		}
	};
});
