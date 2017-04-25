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
          templateUrl: 'build/templates/ic/modal/template/s2-modal.inhouse.html',
          controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
            $scope.listing = $scope.$resolve.listing;
            $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
            };
          }],
          resolve: {
            listing: function () {
              return $scope.listing;
            }
          }
        });
      };
    }
  };
}]);
