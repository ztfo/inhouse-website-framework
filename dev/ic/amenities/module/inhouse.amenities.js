angular.module('ihframework')
.directive('ihAmenities', function() {
	return {
		scope: {
			classes: "@classes",
			amenities: '=',
			config: '=',
			listing: '='
		},
		template: '<ng-include src="templateUrl" class="{{classes}}"></ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope) {
			$scope.$watch('config', function(newVal) {
				if(newVal == undefined) {
					$scope.templateUrl = 'build/templates/ic/amenities/template/p1-inhouse.amenities.html';
				} else {
					$scope.templateUrl = 'build/templates/ic/amenities/template/' + $scope.config + '-inhouse.amenities.html';
				}
			});

			$scope.agent = $rootScope.theUserData;
		}
	};
});
