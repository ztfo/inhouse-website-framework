angular.module('inhouseApp')
.directive('ihSlider', function() {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/slider/template/' + (attrs.config || 's1') + '-inhouse.slider.htm';
		},
		restrict: 'E',
		replace: true,
		scope: {
			slider: '@',
			classes: '@'
		},
		controller: function($scope) {
			$scope.LandingComponent = window.storySettings.LandingComponent;
			$scope.agent = window.agentSettings;
		},
		link: function(scope, element, attrs) {
			scope.$on('storyLoaded', function(event, args) {
				scope.slides = args[scope.slider].slides;
				element.carousel({
                  pause: "false",
                  interval: 25000
                });
			});
		}
	};
});
