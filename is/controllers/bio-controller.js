angular.module('ihframework')
.controller('bioController', ['$rootScope', '$scope', '$routeParams', 'inhouseApi', '$timeout', '$sce', function($rootScope, $scope, $route, inhouseApi, $timeout, $sce) {
	$('.ih-content-body').addClass('hidden');
	$scope.bioAgent = $rootScope.theUserData.bio[$route.agent];
	$scope.$parent.windowTitle = ' | ' + $scope.bioAgent.name;
	$timeout(function() {
		$scope.$broadcast('contentLoaded', $scope.listing);
		$('#main-view').removeClass('load-overlay');
		$('.ih-content-body').removeClass('hidden');
		$('.content-loader').addClass('hidden');
	});
}]);
