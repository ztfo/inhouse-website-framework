angular.module('ihframework')
.directive('ihAmenities', function() {
	return {
		scope: {
			classes: "@classes",
			config: '=',
			listing: '='
		},
		template: '<ng-include src="templateUrl"><ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope) {
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/amenities/template/p1-inhouse.amenities.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/amenities/template/' + $scope.config + '-inhouse.amenities.htm';
				}
			});
			
			$scope.agent = $rootScope.theUserData;
		}
	};
});
