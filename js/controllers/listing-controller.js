angular.module('inhouseApp')
.controller('listingController', ['$scope', '$routeParams', 'inhouseApi', '$timeout', function($scope, $route, inhouseApi, $timeout) {
	$scope.mls = $route.mls;
	window.mls = $scope.mls;
	$('#main-view').addClass('load-overlay');
	inhouseApi.getData({resource: 'listing/' + $scope.mls}).success(function(response) {
		$scope.listing = response.response.listing[0];
		$timeout(function() {
			$scope.$broadcast('listingLoaded', $scope.listing);
			$('.ih-owl-carousel').owlCarousel({
				mouseDrag: true,
				autoWidth: true,
				nav: true,
				margin: 10,
				autoplay: true,
				autoplayHoverPause: true
			});
			$('.ih-owl-carousel').find('.owl-item').click(function() {
				var index = $(this).index('.owl-item');
				$('#listingSlider').carousel(index);
			});

			$('#main-view').removeClass('load-overlay');
		});
	});
	$scope.showLightbox = function() {
		$scope.$parent.currentLightboxImage = $(event.currentTarget).attr('data-image');
		$scope.$parent.currentLightboxCaption = $(event.currentTarget).attr('data-caption');
		$timeout(function() {
			$('#lightbox').lightbox({backdrop: true}).show();
		});
	};
}]);
