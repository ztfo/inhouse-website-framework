angular.module('ihframework').directive('ihPhotoSlider', function(){
  return {
    restrict: 'E',
    template: '<ng-include src="theUrl"></ng-include>',
    link: function(scope, elem, attrs){
      attrs.config = 'p1';
    },
    controller: function($rootScope, $scope, listingService){
      $scope.listing = {
        listingDescription: '',
        photos: []
      };
      $scope.theUrl = 'ic/photo-slider/template/p1-inhouse.photo-slider.htm';
    }
  };
});
