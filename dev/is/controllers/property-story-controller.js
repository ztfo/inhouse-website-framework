angular.module('ihframework')
.controller('propertyStoryView', ['$window', '$rootScope', '$scope', '$routeParams', 'inhouseApi', '$timeout', 'inhouseApiFactory', function($window, $rootScope, $scope, $route, inhouseApi, $timeout, inhouseApiFactory) {
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
	
	inhouseApiFactory.getListing($rootScope.theWebsiteData.mls).success(function(response) {
		$scope.listing = response.listing;
	});
	
	$scope.showLightBox = function(index) {
		var firstHalf = $scope.lightBox.slice().slice(0, index - 1);
		var secondHalf = $scope.lightBox.slice().slice(index);
		
		UIkit.lightbox.create(secondHalf.concat(firstHalf)).show();
	};
}]);
