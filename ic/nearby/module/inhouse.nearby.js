angular.module('ihframework')
.directive('ihNearby', function() {
	return {
		scope: {
			classes: "@classes"
		},
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope) {
			$scope.theUrl = function(config){
				config = 'p1';
				return 'build/templates/ic/nearby/template/' + config + '-inhouse.nearby.htm';
			};
			$scope.agent = $rootScope.theUserData;
			console.log('testings');
		}
	};
});
