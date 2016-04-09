angular.module('inhouseApp')
.directive('ihFeaturedListings', ['inhouseApi', '$timeout', function (inhouseApi, $timeout) {
	return {
		templateUrl: 'inhouse.components/featured-listings/template/inhouse.featured-listings.htm',
		restrict: 'E',
		replace: true,
		controller: function ($scope) {
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
			$timeout(function () {
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

			scope.$on('storyLoaded', function (event, args) {
				//destroy owl carousel
				scope.listingLoaders = 0;
				element.find('.ih-ft-carousel').data('owlCarousel').destroy()
					element.find('.ih-ft-carousel').removeClass('owl-carousel owl-loaded owl-text-select-on')

					scope.homes = args['featuredListings'].listings;

				$timeout((function(inhouseApi) {
						return function () {
						$('.ih-like-btn').click(function() {
							data = {};
							data.mls = $(this).attr('data-mls');
							data.address = $(this).attr('data-address');
							if(typeof Storage !== 'undefined') {
								if(typeof localStorage.inhouseAgentUser !== 'undefined') {
									inhouseApi.getData({resource: 'lead-like-listing', mls: data.mls, address: data.address}).success((function(el) {
										return function(response) {
											if(response.code == '200') {
												el.addClass('ih-liked'); //todo: change this to whatever class marks it as liked!
											}
										};
									})($(this)));
								} else {
									//have them register
									$('#accountModal').modal('show');
									$('#accountModal').on('hidden.bs.modal', (function(data, el) {
										return function() {
											if(typeof Storage !== 'undefined' && typeof localStorage.inhouseAgentUser !== 'undefined') {
												inhouseApi.getData({resource: 'lead-like-listing', mls: data.mls, address: data.address}).success(function(response) {
														if(response.code == '200') {
															el.addClass('ih-liked'); //todo: change this to whatever class marks it as liked!
														}
														$('#accountModal').off('hidden.bs.modal');
												});
											}
										};
									})(data, $(this)));
								}
							}
						});
						element.find('.ih-ft-carousel').owlCarousel({
							mouseDrag: false,
							items: 4,
							nav: true,
							margin: 10,
							autoplay: false,
                            loop: true,
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
					};
				})(inhouseApi));
			});
		}
	};
}]);
