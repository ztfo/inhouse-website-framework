angular.module('ihframework')
.directive('ihListingDetails', [function (inhouseApi, $timeout) {
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
					$scope.templateUrl = 'build/templates/ic/listing-details/template/' + $scope.config + '-inhouse.listing-details.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/listing-details/template/s1-inhouse.listing-details.htm';
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
