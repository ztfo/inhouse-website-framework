angular.module('inhouseApp')
.directive('ihAbout', function() {
	return {
		templateUrl : 'ic/about/template/inhouse.about.htm',
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
