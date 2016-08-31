angular.module('ihframework').directive('ihPhotoSlider', function(){
  return {
    restrict: 'E',
    template: '<ng-include src="templateUrl"></ng-include>',
    scope: {
      'config': '=',
      'listing': '='
    },
    controller: function($rootScope, $scope, listingService, $element, $timeout){
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/photo-slider/template/' + $scope.config + '-inhouse.photo-slider.htm';
				} else {
          $scope.templateUrl = 'build/templates/ic/photo-slider/template/p1-inhouse.photo-slider.htm';
				}
			});
      
      $scope.$watch('listing', function(newVal) {
        if(newVal !== undefined) {
          $scope.loadOwl();
        }
      });
      
      $scope.loadOwl = function() {
        $timeout(function() {
          $element.find('.owl-carousel').owlCarousel({
            lazyLoad : true,
            lazyEffect : "fade",
            navigation: true,
            navigationText : ["<i class='fa fa-caret-left'></i>","<i class='fa fa-caret-right'></i>"],
          });
        });
      };
    }
  };
});
