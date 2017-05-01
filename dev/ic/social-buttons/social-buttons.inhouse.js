angular.module('ihframework')
.directive('ihSocialButtons', function() {
  return {
    templateUrl: 'build/templates/ic/social-buttons/social-buttons.html',
    scope: {
      mls: '=',
      user: '=',
      listing: '='
    },
    controller: ['$scope', 'listhub', function($scope, listhub) {
      $scope.shareUrl = "https://app.getinhouse.io/user/" + $scope.user.userId, + '/share-listing/' + $scope.mls;

      $scope.$watch('listing.url', function(newVal) {
        if(newVal) {
          $scope.listingUrl = $scope.listing.url;
        }
      });

      $scope.shared = function(source) {
        listhub.listingShared($scope.mls, source);
      };
    }]
  };
});
