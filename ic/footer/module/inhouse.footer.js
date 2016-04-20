angular.module('inhouseApp')
.directive('ihFooter', ['$window', function($window) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/footer/template/' + ($window.storySettings.footerConfig || attrs.config || 's1') + '-inhouse.footer.htm';
		},
		scope: {
			classes: "@classes"
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
}]);

