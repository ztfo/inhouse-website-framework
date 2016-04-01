angular.module('inhouseApp')
.controller('contentController', ['$scope', '$routeParams', 'inhouseApi', '$timeout', '$sce', function($scope, $route, inhouseApi, $timeout, $sce) {
	$scope.content = window.agentSettings.content[$route.content];
	$scope.$parent.windowTitle = ' | ' + $scope.content.title;

	$timeout(function() {
		$scope.$broadcast('contentLoaded', $scope.listing);
	});
}]);
