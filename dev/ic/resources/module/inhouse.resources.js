angular.module('ihframework')
.directive('ihResources', function() {
	return {
		template: '<ng-include src="theUrl()"><ng-include>',
		scope: {
			classes: "@classes"
		},
		restrict: 'E',
		controller: function($rootScope, $scope, userDataService){
			$scope.config = userDataService.resourcesConfig
			$scope.theUrl = function(){
				return 'build/templates/ic/resources/template/' + $scope.config + '-inhouse.resources.htm';
			};
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
