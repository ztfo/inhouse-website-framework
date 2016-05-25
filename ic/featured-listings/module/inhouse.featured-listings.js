angular.module('inhouseApp')
.directive('ihFeaturedListings', ['inhouseApi', '$timeout', function (inhouseApi, $timeout) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/featured-listings/template/' + (attrs.config || 's1') + '-inhouse.featured-listings.htm';
		},
		restrict: 'E',
		replace: true,
		scope: {
			classes: "@classes",
			pull: '@'
		},
		controller: function ($scope) {
			$scope.maxFeaturedListings = window.storySettings.maxFeaturedListings || 4;
			$scope.LandingComponent = window.storySettings.FeaturedListings;
			$scope.agent = window.agentSettings;
			$scope.listingLoaders = 10;
			$scope.range = function (min, max, step) {
				step = step || 1;
				var input = [];
				for (var i = min; i < max; i += step) {
					input.push(i);
				}
				return input;
			};
		},
		link: function (scope, element, attrs) {
			$timeout(function() {
				element.find('.ih-ft-carousel').owlCarousel({
					mouseDrag: false,
					items: 4,
					nav: true,
					margin: 10,
					autoplay: false,
					autoplayHoverPause: true,
					responsiveClass: true,
					responsive: {
						0: {
							items: 1
						},
						480: {
							items: 1
						},
						768: {
							items: 2
						},
						1024: {
							items: 4
						}
					}
				});
			});
			if(typeof scope.pull !== 'undefined') {
				inhouseApi.getData({resource: 'featured-listings', 'featured-listings': 'wildcatPassListings'}).success(function(response) {
					//destroy owl carousel
					scope.listingLoaders = 0;
					if(typeof element.find('.ih-ft-carousel').data('owlCarousel') !== 'undefined') {
						element.find('.ih-ft-carousel').data('owlCarousel').destroy();
						element.find('.ih-ft-carousel').removeClass('owl-carousel owl-loaded owl-text-select-on');
					}
					scope.homes = response.response.listings;

					$timeout(function() {
						element.find('.ih-ft-carousel').owlCarousel({
							mouseDrag: false,
							items: 4,
							nav: true,
							margin: 10,
							autoplay: false,
							autoplayHoverPause: true,
							responsiveClass: true,
							responsive: {
								0: {
									items: 1
								},
								480: {
									items: 1
								},
								768: {
									items: 2
								},
								1024: {
									items: 4
								}
							}
						});
					});
				});
			} else {
				scope.$on('storyLoaded', function (event, args) {
					//destroy owl carousel
					scope.listingLoaders = 0;
					if(typeof element.find('.ih-ft-carousel').data('owlCarousel') !== 'undefined') {
						element.find('.ih-ft-carousel').data('owlCarousel').destroy();
						element.find('.ih-ft-carousel').removeClass('owl-carousel owl-loaded owl-text-select-on');
					}
					$timeout(function() {
						element.find('.ih-ft-carousel').owlCarousel({
							mouseDrag: false,
							items: 4,
							nav: true,
							margin: 10,
							autoplay: false,
							autoplayHoverPause: true,
							responsiveClass: true,
							responsive: {
								0: {
									items: 1
								},
								480: {
									items: 1
								},
								768: {
									items: 2
								},
								1024: {
									items: 4
								}
							}
						});
					});

					scope.query = args['featuredListings'].query;
					scope.homes = args['featuredListings'].listings;
				});
			}
		}
	};
}]);
