angular.module('ihframework')
.directive('ihListingSlider', [function (inhouseApi, $timeout) {
  return {
    template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
    restrict: 'E',
    replace: true,
    scope: {
      classes: "@classes",
      config: '=',
      listing: '='
    },
    controller: ['$scope', function ($scope) {
      $scope.$watch('config', function(newVal) {
        if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/listing-slider/template/' + $scope.config + '-listing-slider.html';
        } else {
          $scope.templateUrl = 'build/templates/ic/listing-slider/template/f1-listing-slider.html';
        }
      });

      $scope.showLightBox = function(index) {
        var firstHalf = $scope.lightBox.slice().slice(0, index - 1);
        var secondHalf = $scope.lightBox.slice().slice(index);

        UIkit.lightbox.create(secondHalf.concat(firstHalf)).show();
      };

      $scope.$watch('listing.photos', function(newVal) {
        if(newVal) {
          $scope.prepLightbox();
        }
      });

      $scope.prepLightbox = function() {
        _.each($scope.listing.photos, function(photo, index) {
          _.set($scope, 'lightBox[' + index + ']', {
            'index': index,
            'source' : photo.large,
            'type' : 'image',
            'caption' : photo.caption
          });
        });
      };
    }]
  };
}]);
