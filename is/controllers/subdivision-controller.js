angular.module('ihframework')
.controller('subdivisionController', ['$scope', 'inhouseApi', '$window', '$routeParams', function($scope, inhouseApi, $window, $routeParams) {
	$scope.showModal = function(content) {
		var modal = {};
		if(typeof $scope.subdivision[content] !== 'undefined') {
			modal.title = $scope.subdivision[content].title;
			if(typeof $scope.subdivision[content].content !== 'undefined') {
				modal.body = $scope.subdivision[content].content;
			} else if(typeof $scope.subdivision[content].image !== 'undefined') {
				modal.body = "<img class='img-responsive' src='" + $scope.subdivision[content].image + "'>";
			}
			$scope.$broadcast('showModal', {modal: modal, id: 'subdivModal'});
		}
	};
	if(typeof $window.storySettings.subdivisions !== 'undefined') {
		var subdivs = $window.storySettings.subdivisions;
		for (var i = 0; i < subdivs.length; i++) {
			if(typeof subdivs[i].key !== 'undefined' && subdivs[i].key == $routeParams.sub) {
				$scope.subdivision = subdivs[i];
				break;
			}
		}
	}
}]);
