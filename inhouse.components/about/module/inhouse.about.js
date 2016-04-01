angular.module('inhouseApp')
.directive('ihAbout', function() {
	return {
		templateUrl : 'inhouse.components/about/template/inhouse.about.htm',
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
