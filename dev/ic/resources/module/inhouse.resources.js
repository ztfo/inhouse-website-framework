angular.module('ihframework')
.directive('ihResources', function() {
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
					$scope.templateUrl = 'build/templates/ic/resources/template/' + $scope.config + '-inhouse.resources.html';
				} else {
					$scope.templateUrl = 'build/templates/ic/resources/template/s1-inhouse.resources.html';
				}
			});
		},
		link: function(scope, el, attrs) {
			scope.limit = attrs.limit || 3;
			var resources = [];
			var featured = [];
			//loop through resources to see if any are featured
			for (var i = 0; i < scope.$root.theWebsiteData.content.length; i++) {
				if(typeof scope.$root.theWebsiteData.content[i].featured !== 'undefined' && scope.$root.theWebsiteData.content[i].featured === true) {
					featured.push(scope.$root.theWebsiteData.content[i]);
				} else {
					resources.push(scope.$root.theWebsiteData.content[i]);
				}
			}
			scope.resources = featured.concat(resources);
		}
	};
});
