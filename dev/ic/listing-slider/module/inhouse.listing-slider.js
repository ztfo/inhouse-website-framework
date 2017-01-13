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
		},
		link: function (scope, element, attrs) {
			scope.$on('listingLoaded', function (event, args) {
				scope.listing = args;
			});
		}
	};
}]);
