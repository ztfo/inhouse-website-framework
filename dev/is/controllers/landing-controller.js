angular.module('ihframework')
.controller('mainController', ['$scope', 'inhouseApi', '$rootScope', function($scope, inhouseApi, $rootScope) {
	$scope.filters = {};
	$scope.layout = $rootScope.theWebsiteData.landingLayout;
	
	inhouseApi.getData({resource: 'agent-story'}).success(function(response) {
		$scope.$broadcast('storyLoaded', response.response);
	}).error(function() {
		console.log('error loading plugins');
	});
}]);
