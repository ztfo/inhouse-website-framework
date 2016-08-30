angular.module('ihframework')
.directive('ihDivider', function() {
	return {
		scope: {
			classes: "@classes"
		},
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		link: function(scope, elem, attrs){
			scope.config = attrs.config;
		},
		controller: function($rootScope, $scope) {
			$scope.theUrl = function(){
				return 'build/templates/ic/divider/template/' + $scope.config + '-inhouse.divider.htm';
			};
			$scope.agent = $rootScope.theUserData;
		}
	};
});
