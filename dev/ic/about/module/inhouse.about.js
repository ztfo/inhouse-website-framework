angular.module('ihframework')
.directive('ihAbout', function() {
	return {
		scope: {
			classes: "@classes",
			config: '='
		},
		template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
		restrict: 'E',
		controller: function($scope, $rootScope, userDataService, $document) {
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/about/template/' + newVal + '-inhouse.about.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/about/template/s1-inhouse.about.htm';
				}
			});

			$scope.$on('agents clicked', function(event, args){
				console.log(args);
				$scope.lenderOnly = args.data;
			});

			$scope.$on('lenders clicked', function(event, args){
				console.log(args);
				$scope.lenderOnly = args.data;
			});

			$scope.agent = $rootScope.theUserData;
		}
	};
});
