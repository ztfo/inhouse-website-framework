angular.module('inhouseApp')
.directive('ihAbout', function() {
	return {
		templateUrl : 'ic/about/template/s2-inhouse.about.htm',
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
