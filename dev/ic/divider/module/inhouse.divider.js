angular.module('ihframework')
.directive('ihDivider', function() {
	return {
		scope: {
			classes: "@classes",
			config: '='
		},
		template: '<ng-include src="templateUrl" class="{{classes}}"></ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope) {
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
				 	$scope.templateUrl = 'build/templates/ic/divider/template/' + $scope.config + '-inhouse.divider.html';
				} else {
				 	$scope.templateUrl = 'build/templates/ic/divider/template/s1-inhouse.divider.html';
				}
			});
			$scope.agent = $rootScope.theUserData;
		}
	};
});
