angular.module('inhouseApp')
.controller('myListingsController', ['$scope', '$routeParams', 'inhouseApi', '$timeout', '$sce', function($scope, $route, inhouseApi, $timeout, $sce) {
	$scope.content = {};
	$scope.content.title = 'My Listings';
	$scope.content.sub = 'View all my liked listings';
	
//	$scope.$parent.windowTitle = ' | ' + $scope.content.title;

	$timeout(function() {
		$scope.$broadcast('contentLoaded', $scope.listing);
	});
}]);
