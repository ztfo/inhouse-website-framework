angular.module('ihframework')
.directive('ihAbout', function() {
	return {
		scope: {
			classes: "@classes"
		},
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		controller: function($scope, $rootScope, userDataService) {

			$scope.config = userDataService.aboutConfig;
			$scope.theUrl = function(){
				return 'build/templates/ic/about/template/' + $scope.config + '-inhouse.about.htm';
			};
			$scope.agent = $rootScope.theUserData;
		}
	};
});
