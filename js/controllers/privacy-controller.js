angular.module('inhouseApp')
.controller('privacyController', ['$scope', '$routeParams', 'inhouseApi', '$timeout', '$sce', function($scope, $route, inhouseApi, $timeout, $sce) {
	$timeout(function() {
		$scope.$broadcast('contentLoaded', $scope.listing);
	});
}]);
