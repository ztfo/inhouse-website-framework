angular.module('ihframework')
.directive('ihLikeButton', ['inhouseApi', function(inhouseApi) {
  return {
    replace: true,
    templateUrl : 'build/templates/ic/like-button/template/s1-inhouse.like-button.html',
    restrict: 'E',
    scope: {
      listing: '='
    },
    controller: ['ihLead', '$scope', function(ihLead, $scope) {
      $scope.style = 'heart';

      $scope.likeButton = function($event) {
        if($scope.liked) return;

        var data = {};
        var button = $($event.target).parent();
        $scope.liked = true;

        ihLead.capture(function() {
          inhouseApi.newApi.leadLikeListing({mls: $scope.listing.mls}).success(function(response) {
          });
        });

        $event.preventDefault();
        $event.stopPropagation();
      };

      $scope.$watch('listing.ready', function(newVal) {
        if(newVal) {
          $scope.liked = ihLead.likesListing($scope.listing.mls);
        }
      });
    }]
  };
}]);
