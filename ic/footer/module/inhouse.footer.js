angular.module('inhouseApp')
.directive('ihFooter', ['$window', function($window) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/footer/template/' + ($window.storySettings.footerConfig || attrs.config || 's1') + '-inhouse.footer.htm';
		},
		scope: {
			classes: "@classes",
			maxNavColumns: "@navColumns"
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.NavBar = window.storySettings.NavBar;
			$scope.footerColumns = [];
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

