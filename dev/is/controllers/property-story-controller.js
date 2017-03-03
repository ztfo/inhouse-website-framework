angular.module('ihframework')
.controller('propertyStoryView', ['$window', '$rootScope', '$scope', '$routeParams', 'inhouseApi', '$timeout', function($window, $rootScope, $scope, $route, inhouseApi, $timeout) {
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
	// not sure how to access shareUrl in components / possibly not needed here?; see inhouse.navbar.js
	$scope.shareUrl = "https://www.getinhouse.io/share-listing/" + $rootScope.theUserData.userId + '/' + $rootScope.theWebsiteData.mls;
	console.log($scope.shareUrl);
	inhouseApi.newApi.getListingDetails($rootScope.theWebsiteData.mls, 'v2').success(function(response) {
		if(response.listing !== undefined) $scope.listing = response.listing;
		else $scope.listing = response.data.listing;
	});

	$scope.showLightBox = function(index) {
		var firstHalf = $scope.lightBox.slice().slice(0, index - 1);
		var secondHalf = $scope.lightBox.slice().slice(index);

		UIkit.lightbox.create(secondHalf.concat(firstHalf)).show();
	};
}]);
