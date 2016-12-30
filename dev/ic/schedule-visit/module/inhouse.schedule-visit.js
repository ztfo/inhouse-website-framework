angular.module('ihframework')
.directive('ihScheduleVisit', ['inhouseApi', '$uibModal', function(inhouseApi, $uibModal) {
	return {
		replace: true,
		templateUrl : 'build/templates/ic/schedule-visit/template/s1-inhouse.schedule-visit.html',
		restrict: 'E',
		scope: {
			listing: '='
		},
		controller: function($scope) {
			$scope.scheduleVisit = function() {
				$uibModal.open({
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'build/templates/ic/modal/template/s2-modal.inhouse.html',
					resolve: {
						items: function () {
							return $scope.listing;
						}
					}
				});
			};
		}
	};
}]);
