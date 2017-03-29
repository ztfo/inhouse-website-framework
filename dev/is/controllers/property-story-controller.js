angular.module('ihframework')
.controller('propertyStoryView', ['$window', '$rootScope', '$scope', '$routeParams', 'inhouseApi', '$timeout', function($window, $rootScope, $scope, $route, inhouseApi, $timeout) {
  $('#main-view').addClass('load-overlay');

  if(typeof $rootScope.theWebsiteData.listingConfig !== 'undefined' && $rootScope.theWebsiteData.listingConfig === 's2') {
    $rootScope.$broadcast('hideFooter');
    $scope.$on('$destroy', function() {
      $rootScope.$broadcast('showFooter');
    });
  }

  $scope.$on('$destroy', function() {
    //prevent the modal from persisting
    $('#accountModal').off('hidden.bs.modal');
    $('#accountModal').modal('hide');
  });
  // not sure how to access shareUrl in components / possibly not needed here?; see inhouse.navbar.js
  $scope.shareUrl = "https://app.getinhouse.io/user/" + $rootScope.theUserData.userId + '/share-listing/' + $rootScope.theWebsiteData.mls;
  $scope.listing = window.listing;

  $scope.showLightBox = function(index) {
    var firstHalf = $scope.lightBox.slice().slice(0, index - 1);
    var secondHalf = $scope.lightBox.slice().slice(index);

    UIkit.lightbox.create(secondHalf.concat(firstHalf)).show();
  };
}]);
