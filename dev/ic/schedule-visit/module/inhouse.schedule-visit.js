angular.module('ihframework')
.directive('ihScheduleVisit', ['inhouseApi', function(inhouseApi) {
	return {
		replace: true,
		templateUrl : 'build/templates/ic/schedule-visit/template/s1-inhouse.schedule-visit.html',
		restrict: 'E',
		scope: {
			listing: '='
		},
		controller: function($scope) {
			$scope.scheduleVisit = function() {
				console.log($scope.listing);
			};
		}
	};
}]);
