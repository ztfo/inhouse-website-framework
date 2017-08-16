angular.module('ihframework')
.directive('ihAboutListing', function() {
  return {
    scope: {
      classes: "@classes",
      listing: '=',
      config: '=',
      data: '=',
    },
    template: '<ng-include src="templateUrl" class="{{classes}}"></ng-include>',
    restrict: 'E',
    controller: function($rootScope, $scope) {
      //only save the public remarks so the rest of the listing comes back unscathed

      $scope.shareUrl = window.location.href;

      $scope.$watch('data.publicRemarks', function(newVal) {
        if(newVal != _.get($scope, 'listing.Details.publicRemarks' && newVal)) {
          _.set($scope, 'listing.Details.publicRemarks', newVal);
        }
      });

      $scope.$watch('listing.Details.publicRemarks', function(newVal) {
        _.set($scope, 'data.publicRemarks', _.get($scope, 'listing.Details.publicRemarks'));
      });

      $scope.$watch('config', function(newVal) {
        if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/about-listing/template/' + $scope.config + '-inhouse.about-listing.html';
        } else {
          $scope.templateUrl = 'build/templates/ic/about-listing/template/p1-inhouse.about-listing.html';
        }
      });
      $scope.agent = $rootScope.theUserData;
    }
  };
});
