angular.module('ihframework')
.controller('listingController', ['$window', '$rootScope', '$scope', '$routeParams', 'inhouseApi', '$timeout', function($window, $rootScope, $scope, $route, inhouseApi, $timeout) {
	$scope.mls = $route.mls;
	window.mls = $scope.mls;
	$('#main-view').addClass('load-overlay');

	if(typeof $rootScope.theWebsiteData.listingConfig !== 'undefined' && $rootScope.theWebsiteData.listingConfig === 's2') {
		$rootScope.$broadcast('hideFooter');
		$scope.$on('$destroy', function() {
			$rootScope.$broadcast('showFooter');
		});
	}

	$scope.$on('$destroy', function() {
		//prevent the modal from persisting
		$('#accountModal').off('hidden.bs.modal');
		$('#accountModal').modal('hide');
	});
	$scope.shareUrl = "https://www.getinhouse.io/share-listing/" + $rootScope.theUserData.userId + '/' + $scope.mls;
	$scope.getData = function() {
		if(typeof Storage !== 'undefined') {
			if(typeof localStorage.inhouseAgentUser !== 'undefined') { //user is signed in already, load the listing
			} else {
				if(typeof localStorage.inhouseViewedListings !== 'undefined') { //user isn't signed in yet, and they have viewed listings already
					if($rootScope.theWebsiteData.disableLeadSignup !== true) {
						$scope.viewedListings = $.parseJSON(localStorage.inhouseViewedListings);
						if($scope.viewedListings.indexOf($scope.mls) !== -1) {
						} else if((localStorage.inhouseSearchFreebies !== 'false' && $scope.viewedListings.length > 2 )|| (localStorage.inhouseSearchFreebies == 'false' && $scope.viewedListings.length > 5)) {
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
					}
				} else { //they haven't viewed any yet, add this to the arr
					$scope.viewedListings = [$scope.mls];
					localStorage.inhouseViewedListings = JSON.stringify($scope.viewedListings);
				}
			}
		}

		inhouseApi.newApi.getListingDetails($scope.mls).success(function(response) {
//		inhouseApi.getData({resource: 'listing/' + $scope.mls}).success(function(response) {
			$scope.listing = response.listing;
			$scope.url = window.location.href;
			$scope.lightBox = [];

			for (var i = 0; i < $scope.listing.photos.length; i++) {
				$scope.lightBox.push({
					'index': i,
					'source' : $scope.listing.photos[i].large,
					'type' : 'image',
					'caption' : $scope.listing.photos[i].caption
				});
			}

			$timeout(function() {
				$scope.$broadcast('listingLoaded', $scope.listing);
				$scope.$on('owlItemClicked', function(event, args) {
					$('#listingSlider').carousel(args.index);
				});

				$('#main-view').removeClass('load-overlay');
			});
		});
	};


	$scope.getData();

	$scope.showLightBox = function(index) {
		var firstHalf = $scope.lightBox.slice().slice(0, index - 1);
		var secondHalf = $scope.lightBox.slice().slice(index);
		
		UIkit.lightbox.create(secondHalf.concat(firstHalf)).show();
	};
}]);
