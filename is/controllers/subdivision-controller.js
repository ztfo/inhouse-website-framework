angular.module('inhouseApp')
.controller('subdivisionController', ['$scope', 'inhouseApi', '$window', '$routeParams', function($scope, inhouseApi, $window, $routeParams) {
	if(typeof $window.storySettings.subdivisions !== 'undefined') {
		var subdivs = $window.storySettings.subdivisions;
		for (var i = 0; i < subdivs.length; i++) {
			if(typeof subdivs.key !== 'undefined' && subdivs.key == $routeParams.sub) {
				$scope.subdivision = subdivs[i];
				break;
			}
		}
	}
}]);
