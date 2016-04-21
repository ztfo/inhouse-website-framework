angular.module('inhouseApp')
.directive('ihTestimonials', ['$timeout', function($timeout) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/testimonials/template/' + (attrs.config || 's1') + '-inhouse.testimonials.htm';
		},
		restrict: 'E',
		replace: true,
		scope: {
			testimonial: '@',
			classes: '@',
			source: '@'
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
			if(typeof scope.source !== 'undefined' && scope.source == 'storySettings') {
				if(typeof window.storySettings.testimonials !== 'undefined') {
					scope.testimonials = window.storySettings.testimonials;
				}
			}
			if(typeof scope.source === 'undefined' || scope.source == 'hybrid' || scope.source == 'zillow') {
				scope.showZillow = true;
				scope.$on('storyLoaded', function(event, args) {
					scope.testimonials = [];
					scope.testimonials = args[scope.testimonial].testimonials;

					if(typeof scope.source !== 'undefined' && scope.source == 'hybrid' && typeof window.storySettings.testimonials !== 'undefined') {
						for (var i = 0; i < window.storySettings.testimonials.length; i++) {
							scope.testimonials.unshift(window.storySettings.testimonials[i]);
						}
					}
					$timeout(function() {
						element.carousel({
							pause: "true",
							interval: 9999
						});
					});
				});
			}
		}
	};
}]);
