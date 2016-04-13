angular.module('inhouseApp')
.directive('ihNavbar', function() {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/navbar/template/' + (attrs.config || 's1') + '-inhouse.navbar.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.navbar = window.storySettings.NavBar;
			$scope.agent = window.agentSettings;
		}
	};
});
