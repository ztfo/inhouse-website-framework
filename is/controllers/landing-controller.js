angular.module('ihframework')
.controller('mainController', ['$scope', 'inhouseApi', function($scope, inhouseApi) {
	$scope.filters = {};
	inhouseApi.getData({resource: 'agent-story'}).success(function(response) {
		$scope.$broadcast('storyLoaded', response.response);
	}).error(function() {
		console.log('error loading plugins');
	});
}]);
