angular.module('inhouseApp')
.controller('listingController', ['$scope', '$routeParams', 'inhouseApi', '$timeout', function($scope, $route, inhouseApi, $timeout) {
	$scope.mls = $route.mls;
	window.mls = $scope.mls;
	$('#main-view').addClass('load-overlay');
	inhouseApi.getData({resource: 'listing/' + $scope.mls}).success(function(response) {
		$scope.listing = response.response.listing[0];
		$scope.url = window.location.href;
		$scope.lightBox = [];

		for (var i = 0; i < $scope.listing.photos.length; i++) {
			$scope.lightBox.push({
				'source' : $scope.listing.photos[i].UriLarge,
				'type' : 'image',
				'caption' : $scope.listing.photos[i].Caption
			});
		}

		$timeout(function() {
			$scope.$broadcast('listingLoaded', $scope.listing);
			$('.ih-owl-carousel').owlCarousel({
				mouseDrag: true,
				autoWidth: true,
				nav: true,
				margin: 10,
				autoplay: false,
				autoplayHoverPause: true
			});
			$('.ih-owl-carousel').find('.owl-item').click(function() {
				var index = $(this).index('.owl-item');
				$('#listingSlider').carousel(index);
			});

			$('#main-view').removeClass('load-overlay');
		});
	});
	$scope.showLightBox = function() {
		UIkit.lightbox.create($scope.lightBox).show();
	};
}]);
