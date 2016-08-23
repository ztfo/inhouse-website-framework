angular.module('ihframework')
.directive('ihListingDetails', [function (inhouseApi, $timeout) {
	return {
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		replace: true,
		scope: {
			classes: "@classes"
		},
		controller: function ($scope) {
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/listing-details/template/' + config + '-inhouse.listing-details.htm';
			};

		},
		link: function (scope, element, attrs) {
			scope.$on('listingLoaded', function (event, args) {
				scope.listing = args;
			});
		}
	};
}]);
