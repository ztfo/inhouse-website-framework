angular.module('ihframework').directive('ihPhotoSlider', function(){
	return {
		restrict: 'E',
		template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
		scope: {
			config: '=',
			responsive: '=',
			listing: '='
		},
		controller: function($rootScope, $scope, listingService, $element, $timeout){
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/photo-slider/template/' + $scope.config + '-inhouse.photo-slider.html';
				} else {
					$scope.templateUrl = 'build/templates/ic/photo-slider/template/p1-inhouse.photo-slider.html';
				}
			});

			/* took segment from inhouse.testimonials but newVal is undefined
			$scope.$watch('responsive', function(newVal) {
				if(newVal !== undefined) {
					$scope.responsive = newVal;
				}
			});
			*/

			$scope.$watch('listing', function(newVal) {
				if(newVal !== undefined) {
					$scope.loadOwl();
				}
			});

			$scope.rightPosition = 0;

			$scope.slideLeft = function() {
				$scope.rightPosition = Math.max($scope.rightPosition - $element.find('.grid-image').width(), 0);
			};
			$scope.slideRight = function() {
				$scope.rightPosition = Math.min($scope.rightPosition + $element.find('.grid-image').width(), $element.find('.image-grid').width() - $element.find('.ih.slider-row').width());
			};

			$scope.showLightBox = function(index) {
				var listing = $scope.listing.Details.photos;

				var photos = [];
				var i = 0;
				listing.map(function(listing) {
					photos[i] = listing.large;
					i++;
				});

				var firstHalf = photos.slice().slice(0, index - 1);
				var secondHalf = photos.slice().slice(index);

				UIkit.lightbox.create(secondHalf.concat(firstHalf)).show();
			};

			$scope.loadOwl = function() {
				$timeout(function() {
					$element.find('.owl-carousel').owlCarousel({
						lazyLoad : true,
						lazyEffect : "fade",
						navigation: true,
						navigationText : ["<i class='fa fa-caret-left'></i>","<i class='fa fa-caret-right'></i>"],
						responsive: {
								0: {
										items: 1
								},
								480: {
										items: 1
								},
								768: {
										items: 1
								},
								1024: {
										items: 3
								}
						}
					});
				});
			};
		}
	};
});
