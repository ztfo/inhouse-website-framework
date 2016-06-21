angular.module('inhouseApp')
.directive('ihListingDetails', function() {
	return {
		scope: {
			classes: "@classes"
		},
		templateUrl : function(el, attrs) {
			return 'ic/about/template/' + (attrs.config || 's1') + '-inhouse.listing.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
