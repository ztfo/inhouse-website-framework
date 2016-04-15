angular.module('inhouseApp')
.directive('ihNavbar', ['$window', function($window) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/navbar/template/' + ($window.storySettings.navbarConfig || attrs.config || 's1') + '-inhouse.navbar.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.navbar = window.storySettings.NavBar;
			$scope.agent = window.agentSettings;
		}
	};
}]);
