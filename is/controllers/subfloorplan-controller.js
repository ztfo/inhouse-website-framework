angular.module('inhouseApp')
.controller('subfloorplanController', ['$scope', 'inhouseApi', '$window', '$routeParams', function($scope, inhouseApi, $window, $routeParams) {
	if(typeof $window.storySettings.subdivisions !== 'undefined') {
		var subdivs = $window.storySettings.subdivisions;
		for (var i = 0; i < subdivs.length; i++) {
			if(typeof subdivs[i].key !== 'undefined' && subdivs[i].key == $routeParams.sub) {
				if(typeof subdivs[i].floorplans !== 'undefined') {
					for (var j = 0; j < subdivs[i].floorplans.length; j++) {
						if(subdivs[i].floorplans[j].name == $routeParams.floorplan) {
							$scope.floorplan = subdivs[i].floorplans[j];
							break;
						}
					}
				}
				break;
			}
		}
	}
}]);
