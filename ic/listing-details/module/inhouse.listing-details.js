angular.module('ihframework')
.directive('ihListingDetails', [function (inhouseApi, $timeout) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/listing-details/template/' + (attrs.config || 's1') + '-inhouse.listing-details.htm';
		},
		restrict: 'E',
		replace: true,
		scope: {
			classes: "@classes"
		},
		controller: function ($scope) {
		},
		link: function (scope, element, attrs) {
			scope.$on('listingLoaded', function (event, args) {
				scope.listing = args;
			});
		}
	};
}]);

