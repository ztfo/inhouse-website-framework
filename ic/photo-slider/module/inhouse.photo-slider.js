angular.module('inhouseApp')
.directive('ihPhotoSlider', function() {
	return {
		scope: {
			classes: "@classes"
		},
		templateUrl : function(el, attrs) {
			return 'ic/about/template/' + (attrs.config || 's1') + '-inhouse.photo-slider.htm';
		},
		restrict: 'E',
		controller: function($scope) {
			$scope.agent = window.agentSettings;
		}
	};
});
