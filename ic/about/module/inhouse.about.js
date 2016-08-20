angular.module('ihframework')
.directive('ihAbout', function() {
	return {
		scope: {
			classes: "@classes"
		},
		templateUrl : function(el, attrs) {
			return 'ic/about/template/' + (attrs.config || 's1') + '-inhouse.about.htm';
		},
		restrict: 'E',
		controller: function($scope, userData) {
			console.log(userData);
			$scope.agent = window.agentSettings;
		}
	};
});
