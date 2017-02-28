angular.module('ihframework')
.directive('ihListingSlider', [function (inhouseApi, $timeout) {
	return {
		template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
		restrict: 'E',
		replace: true,
		scope: {
			classes: "@classes",
			config: '=',
			listing: '='
		},
		controller: function ($scope) {
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/listing-slider/template/' + $scope.config + '-listing-slider.html';
				} else {
					$scope.templateUrl = 'build/templates/ic/listing-slider/template/f1-listing-slider.html';
				}
			});

			$scope.showLightBox = function(index) {
				var firstHalf = $scope.lightBox.slice().slice(0, index - 1);
				var secondHalf = $scope.lightBox.slice().slice(index);

				UIkit.lightbox.create(secondHalf.concat(firstHalf)).show();
			};
		},
		link: function ($scope, element, attrs) {
			$scope.$on('listingLoaded', function (event, args) {
				$scope.lightBox = [];
				$scope.listing = args;

				for (var i = 0; i < $scope.listing.Details.photos.length; i++) {
					$scope.lightBox.push({
						'index': i,
						'source' : $scope.listing.Details.photos[i].large,
						'type' : 'image',
						'caption' : $scope.listing.Details.photos[i].caption
					});
				}

			});
		}
	};
}]);
