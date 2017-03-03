angular.module('ihframework')
.directive('ihAboutListing', function() {
	return {
		scope: {
			classes: "@classes",
			listing: '=',
			config: '=',
			data: '=',
		},
		template: '<ng-include src="templateUrl" class="{{classes}}"></ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope) {
			//only save the public remarks so the rest of the listing comes back unscathed

			$scope.shareUrl = window.location.href;
			
			$scope.$watch('listing.publicRemarks', function(newVal, oldVal) {
				if(oldVal == undefined) { //first time running this
					if(typeof $scope.data == 'object' && $scope.data.publicRemarks !== undefined && typeof $scope.listing == 'object') {
						$scope.listing.publicRemarks = $scope.data.publicRemarks;
					}
				} else {
					if(typeof $scope.data == 'object') {
						$scope.data.publicRemarks = newVal;
					}
				}
			});

			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/about-listing/template/' + $scope.config + '-inhouse.about-listing.html';
				} else {
					$scope.templateUrl = 'build/templates/ic/about-listing/template/p1-inhouse.about-listing.html';
				}
			});
			$scope.agent = $rootScope.theUserData;
		}
	};
});
