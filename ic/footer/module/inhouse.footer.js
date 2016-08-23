angular.module('ihframework')
.directive('ihFooter', ['$window', function($window) {
	return {
		template: '<ng-include src="theUrl()"><ng-include>',
		scope: {
			classes: "@classes",
			maxNavColumns: "@navColumns"
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/footer/template/' + config + '-inhouse.footer.htm';
			};

			$scope.NavBar = window.storySettings.NavBar;
			$scope.footerColumns = [];

			$scope.$on('viewChanged', function(event, args) {
				$scope.controller = args;
			});
			if($scope.maxNavColumns === undefined) { //default to 2 columns
				$scope.maxNavColumns = 2;
			}
			for (var i = 0; i < $scope.NavBar.length; i++) {
				if($scope.NavBar[i].type == 'menu') {
					$scope.footerColumns.push($scope.NavBar[i]);
				}
			}
			$scope.agent = window.agentSettings;
			$scope.$on('hideFooter', function() {
				$scope.showFooter = false;
			});
			$scope.$on('showFooter', function() {
				$scope.showFooter = true;
			});
		}
	};
}]);
