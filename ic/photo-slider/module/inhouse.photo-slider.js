angular.module('ihframework').directive('ihPhotoSlider', function(){
  return {
    restrict: 'E',
    template: '<ng-include src="theUrl"></ng-include>',
    link: function(scope, elem, attrs){
      attrs.config = 'p1';
    },
    controller: function($scope, listingService){
      $scope.listing = {
        listingDescription: '',
        photos: []
      };
      $scope.theUrl = 'ic/photo-slider/template/p1-inhouse.photo-slider.htm';
      listingService.getListings().then(function(res){
        console.log(res);
        $scope.listing.listingDescription = res.data.listing.publicRemarks;
        res.data.listing.photos.map(function(item, index, arr){
          $scope.listing.photos.push(item.thumb);
        });
        console.log($scope.listing);
      });
    }
  };
});
