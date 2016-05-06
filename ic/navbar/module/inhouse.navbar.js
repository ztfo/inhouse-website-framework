angular.module('inhouseApp')
.directive('ihNavbar', ['$rootScope', '$window', function($rootScope, $window) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/navbar/template/' + ($window.storySettings.navbarConfig || attrs.config || 's1') + '-inhouse.navbar.htm';
		},
		scope: {
			classes: "@classes"
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.inhouseAgentUserLoggedIn = $scope.$parent.inhouseAgentUserLoggedIn;
			$scope.navbar = window.storySettings.NavBar;
			if(typeof window.storySettings.navbarClasses !== 'undefined') {
				$scope.classes = window.storySettings.navbarClasses;
			}
			$scope.agent = window.agentSettings;
		}
	};
}]);
