angular.module('ihframework')
.controller('subfloorplanController', ['$rootScope', '$scope', 'inhouseApi', '$window', '$routeParams', '$timeout', function($rootScope, $scope, inhouseApi, $window, $routeParams, $timeout) {
	if(typeof $$rootScope.theWebsiteData.subdivisions !== 'undefined') {
		var subdivs = $$rootScope.theWebsiteData.subdivisions;
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
	$scope.$on('sliderLoaded', function(event, args) {
		if(args.slider == 'floorplans') {
			$scope.$broadcast('storyLoaded', {floorplans: {slides: $scope.floorplan.images}});
		}
	});
}]);
