angular.module('ihframework')
.directive('ihTestimonials', ['$timeout', function($timeout) {
	return {
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		replace: true,
		scope: {
			testimonial: '@',
			classes: '@',
			source: '@',
			max: '@'
		},
		controller: function($rootScope, $scope, userDataService) {
			$scope.config = userDataService.testimonialsConfig;
			$scope.theUrl = function(){
				return 'build/templates/ic/testimonials/template/' + $scope.config + '-inhouse.testimonials.htm';
			};

			$scope.LandingComponent = $rootScope.theWebsiteData.LandingComponent;
			$scope.agent = $rootScope.theUserData;
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
				if(typeof $rootScope.theWebsiteData.testimonials !== 'undefined') {
					scope.testimonials = $rootScope.theWebsiteData.testimonials;
				}
			}
			if(typeof scope.source === 'undefined' || scope.source == 'hybrid' || scope.source == 'zillow') {
				scope.showZillow = true;
				scope.$on('storyLoaded', function(event, args) {
					scope.testimonials = [];
					scope.testimonials = args[scope.testimonial].testimonials;

					if((typeof scope.source === 'undefined' || scope.source == 'hybrid') && typeof scope.$root.theWebsiteData.testimonials === 'object') {
						for (var i = 0; i < scope.$root.theWebsiteData.testimonials.length; i++) {
							scope.testimonials.unshift(scope.$root.theWebsiteData.testimonials[i]);
						}
					}
					$timeout(function() {
						if(element.find('.owl-carousel').length > 0) {
							var params = {};
							if(typeof scope.max !== 'undefined' && scope.max != '') {
								scope.max = parseInt(scope.max);
								params.items = scope.max;
							}

							var testimonialsIndex = 0;
							scope.$root.theWebsiteData.landingLayout.map(function(item, index, arr){
								if(item.responsive){
									testimonialsIndex = index;
								}
							})

							if(scope.$root.theWebsiteData.landingLayout[testimonialsIndex].responsive) {
								params.responsive = scope.$root.theWebsiteData.landingLayout[testimonialsIndex].responsive;
							}
							element.find('.owl-carousel').owlCarousel(params);
						} else {
							var params = {
								pause: "true",
								interval: 9999
							};
							element.carousel(params);
						}
					});
				});
			}
		}
	};
}]);
