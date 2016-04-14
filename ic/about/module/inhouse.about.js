angular.module('inhouseApp')
.directive('ihAbout', function() {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/about/template/' + (attrs.config || 's1') + '-inhouse.about.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
