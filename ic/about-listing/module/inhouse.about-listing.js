angular.module('ihframework')
.directive('ihAboutListing', function() {
	return {
		scope: {
			classes: "@classes"
		},
		templateUrl : function(el, attrs) {
			return 'ic/about-listing/template/' + (attrs.config || 's1') + '-inhouse.about-listing.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
