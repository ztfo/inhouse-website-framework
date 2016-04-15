angular.module('inhouseApp')
.controller('contentController', ['$scope', '$routeParams', 'inhouseApi', '$timeout', '$sce', function($scope, $route, inhouseApi, $timeout, $sce) {
	if(typeof window.agentSettings.content[$route.content] === 'undefined') {
		var content = window.agentSettings.content;
		for (var i = 0; i < content.length; i++) {
			if(content[i].key == $route.content) {
				$scope.content = content[i];
				break;
			}
		}
	} else {
		$scope.content = window.agentSettings.content[$route.content];
	}
	$scope.$parent.windowTitle = ' | ' + $scope.content.title;

	$timeout(function() {
		$scope.$broadcast('contentLoaded', $scope.listing);
	});
}]);
