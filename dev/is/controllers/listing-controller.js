angular.module('ihframework')
.controller('listingController', ['$window', '$rootScope', '$scope', '$routeParams', '$timeout', 'ihLead', 'listing', function($window, $rootScope, $scope, $route, $timeout, ihLead, listing) {
  $scope.mls = $route.mls;
  window.mls = $scope.mls;
  $('#main-view').addClass('load-overlay');

  if(_.get($rootScope, 'theWebsiteData.listingConfig') == 's2') {
    $rootScope.$broadcast('hideFooter');

    $scope.$on('$destroy', function() {
      $rootScope.$broadcast('showFooter');
    });
  }

  $scope.user = $rootScope.theUserData;

  $scope.getData = function() {
    $scope.listing = listing.fetch($scope.mls);

  };

  $scope.$watch('listing.details', function(newVal) {
    if(newVal) {
      $('#main-view').removeClass('load-overlay');
    }
  });

  $scope.$on('owlItemClicked', function(event, args) {
    $('#listingSlider').carousel(args.index);
  });

  ihLead.viewListing($scope.mls, $scope.getData);

}]);
