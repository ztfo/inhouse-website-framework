angular.module('inhouseApp')
.controller('listingController', ['$rootScope', '$scope', '$routeParams', 'inhouseApi', '$timeout', function($rootScope, $scope, $route, inhouseApi, $timeout) {
	$scope.mls = $route.mls;
	window.mls = $scope.mls;
	$('#main-view').addClass('load-overlay');

	$rootScope.$broadcast('hideFooter');	
	$scope.$on('$destroy', function() {
		$rootScope.$broadcast('showFooter');
	});

	$scope.$on('$destroy', function() {
		//prevent the modal from persisting
		$('#accountModal').off('hidden.bs.modal');
		$('#accountModal').modal('hide');
	});
	$scope.getData = function() {
		if(typeof Storage !== 'undefined') {
			if(typeof localStorage.inhouseAgentUser !== 'undefined') { //user is signed in already, load the listing
			} else {
				if(typeof localStorage.inhouseViewedListings !== 'undefined') { //user isn't signed in yet, and they have viewed listings already
					$scope.viewedListings = $.parseJSON(localStorage.inhouseViewedListings);
					if($scope.viewedListings.indexOf($scope.mls) !== -1) { //they have already viewed this listing, let them view it again.
					} else if((localStorage.inhouseSearchFreebies !== 'false' && $scope.viewedListings.length > 2 )|| (localStorage.inhouseSearchFreebies == 'false' && $scope.viewedListings.length > 5)) { //they have viewed too many, show the modal
						$('#accountModal').modal('show');
						$('#accountModal').off('hidden.bs.modal');
						$('#accountModal').on('hidden.bs.modal', (function(scope) {
							return function() {
								$scope.getData();
							};
						})($scope));
						return;
					} else { //not at the limit yet. push this mls to the stack
						$scope.viewedListings.push($scope.mls);	
						localStorage.inhouseViewedListings = JSON.stringify($scope.viewedListings);
					}
				} else { //they haven't viewed any yet, add this to the arr
					$scope.viewedListings = [$scope.mls];
					localStorage.inhouseViewedListings = JSON.stringify($scope.viewedListings);
				}
			}
		}

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
	};


	$scope.getData();
	
	$scope.showLightBox = function() {
		UIkit.lightbox.create($scope.lightBox).show();
	};
}]);
