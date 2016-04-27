angular.module('inhouseApp')
.controller('contentController', ['$compile', '$templateRequest', '$scope', '$routeParams', 'inhouseApi', '$timeout', '$sce', '$location', function($compile, $templateRequest, $scope, $route, inhouseApi, $timeout, $sce, $location) {
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
	if(typeof $scope.content === 'undefined' || typeof $scope.content.title === 'undefined' || typeof $scope.content.content === 'undefined') {
		if(typeof $scope.content.contentUrl !== 'undefined') {

		} else {
			$location.path('/missing');
		}
	} else {
		$scope.$parent.windowTitle = ' | ' + $scope.content.title;
	}

	$timeout(function() {
		$scope.$broadcast('contentLoaded', $scope.listing);
	});
}]);
