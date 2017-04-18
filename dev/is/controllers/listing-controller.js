angular.module('ihframework')
.controller('listingController', ['$window', '$rootScope', '$scope', '$routeParams', 'inhouseApi', '$timeout', 'ihLead', function($window, $rootScope, $scope, $route, inhouseApi, $timeout, ihLead) {
  $scope.mls = $route.mls;
  window.mls = $scope.mls;
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


  $scope.user = $rootScope.theUserData;

  ihLead.viewListing($scope.mls, $scope.getData);

  $scope.getData = function() {
    inhouseApi.newApi.getListingDetails($scope.mls, 'v2').success(function(response) {
      if(typeof response.listing !== 'undefined') {

        $scope.listing = response.listing;
        $scope.listing.showOldTable = true;

        if($scope.listing.photos !== undefined) {
          var photos = $scope.listing.photos;
        } else {
          var photos = [];
        }

      } else if(typeof response.data !== 'undefined' && typeof response.data.listing !== 'undefined') {
        $scope.listing = response.data.listing;
        var photos = $scope.listing.Details.photos;
      } else {
        $scope.listing = response;
      }

      $scope.url = window.location.href;
      $scope.lightBox = [];

      for (var i = 0; i < photos.length; i++) {
        $scope.lightBox.push({
          'index': i,
          'source' : photos[i].large,
          'type' : 'image',
          'caption' : photos[i].caption
        });
      }

      $timeout(function() {
        $scope.$broadcast('listingLoaded', $scope.listing);
        $scope.$on('owlItemClicked', function(event, args) {
          $('#listingSlider').carousel(args.index);
        });

        $('#main-view').removeClass('load-overlay');
      });
    });
  };

}]);
