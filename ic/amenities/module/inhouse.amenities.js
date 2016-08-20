angular.module('ihframework')
.directive('ihAmenities', function() {
	return {
		scope: {
			classes: "@classes"
		},
		templateUrl : function(el, attrs) {
			return 'ic/amenities/template/' + (attrs.config || 's1') + '-inhouse.amenities.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
