angular.module('inhouseApp')
.directive('ihNavbar', function() {
	return {
		templateUrl : 'ic/navbar/template/inhouse.navbar.htm',
		restrict: 'E',
		controller: function($scope) {
			$scope.navbar = window.storySettings.NavBar;
			$scope.agent = window.agentSettings;
		}
	};
});
