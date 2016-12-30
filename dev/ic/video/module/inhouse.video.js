angular.module('ihframework')
.directive('ihVideo', function() {
	return {
		template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
		scope: {
			classes: "@classes",
			config: '='
		},
		restrict: 'E',
		controller: function($rootScope, $scope, userDataService){
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/video/template/' + $scope.config + '-inhouse.video.html';
				} else {
					$scope.templateUrl = 'build/templates/ic/video/template/s1-inhouse.video.html';
				}
			});
		},
		link: function(scope, el, attrs) {
			scope.limit = attrs.limit || 3;
			var resources = [];
			var featured = [];
			//loop through resources to see if any are featured
			for (var i = 0; i < scope.$root.theUserData.content.length; i++) {
				if(typeof scope.$root.theUserData.content[i].featured !== 'undefined' && scope.$root.theUserData.content[i].featured === true) {
					featured.push(scope.$root.theUserData.content[i]);
				} else {
					resources.push(scope.$root.theUserData.content[i]);
				}
			}
			scope.resources = featured.concat(resources);
		}
	};
});
