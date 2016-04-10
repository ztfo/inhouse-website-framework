angular.module('inhouseApp')
.directive('ihSlider', function() {
	return {
		templateUrl : 'ic/slider/template/inhouse.slider.htm',
		restrict: 'E',
		replace: true,
		scope: {
			slider: '@',
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
                  interval: 7000
                });
			});
		}
	};
});
