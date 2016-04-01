angular.module('inhouseApp')
.directive('ihListingLoader', ['$routeParams', '$timeout', '$location', function($routeParams, $timeout, $location) {
	return {
		replace: true,
		templateUrl : 'inhouse.components/listing-loader/template/inhouse.listing-loader.htm'
	};
}]);
