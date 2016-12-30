angular.module('ihframework').directive('ihPhotoSlider', function(){
  return {
    restrict: 'E',
		template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
    scope: {
      'config': '=',
      'listing': '='
    },
    controller: function($rootScope, $scope, listingService, $element, $timeout){
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/photo-slider/template/' + $scope.config + '-inhouse.photo-slider.html';
				} else {
          $scope.templateUrl = 'build/templates/ic/photo-slider/template/p1-inhouse.photo-slider.html';
				}
			});

      $scope.$watch('listing', function(newVal) {
        if(newVal !== undefined) {
          $scope.loadOwl();
        }
      });

    	$scope.showLightBox = function(index) {
        var listing = $scope.listing.photos;

        var photos = [];
        var i = 0;
        listing.map(function(listing) {
          photos[i] = listing.large;
          i++;
        });

    		var firstHalf = photos.slice().slice(0, index - 1);
    		var secondHalf = photos.slice().slice(index);

    		UIkit.lightbox.create(secondHalf.concat(firstHalf)).show();
    	};

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
