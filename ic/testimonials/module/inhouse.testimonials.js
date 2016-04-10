angular.module('inhouseApp')
.directive('ihTestimonials', ['$timeout', function($timeout) {
	return {
		templateUrl : 'ic/testimonials/template/inhouse.testimonials.htm',
		restrict: 'E',
		replace: true,
		scope: {
			testimonial: '@',
		},
		controller: function($scope) {
			$scope.LandingComponent = window.storySettings.LandingComponent;
			$scope.agent = window.agentSettings;
			$scope.range = function(min, max, step) {
				step = step || 1;
				var input = [];
				for (var i = min; i <= max; i += step) {
						input.push(i);
				}
				return input;
			};
		},
		link: function(scope, element, attrs) {
			scope.$on('storyLoaded', function(event, args) {
				scope.testimonials = args[scope.testimonial].testimonials;
				$timeout(function() {
					element.carousel({
						pause: "false",
						interval: 7000
					});
				});
			});
		}
	};
}]);
