angular.module('ihframework')
.directive('ihNearby', function() {
	return {
		scope: {
			classes: "@classes",
			listing: '=',
			config: '='
		},
		template: '<ng-include src="templateUrl"><ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope) {
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/nearby/template/' + newVal + '-inhouse.nearby.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/nearby/template/p1-inhouse.nearby.htm';
				}
			});
			$scope.agent = $rootScope.theUserData;
		}
	};
});
