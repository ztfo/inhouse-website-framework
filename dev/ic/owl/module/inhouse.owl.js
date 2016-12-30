angular.module('ihframework')
.directive('ihOwl', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      items: '=',
      responsive: '=',
      length: '='
    },
    controller: function ($rootScope, $scope, userDataService, $element) {
      $scope.$watch('items', function(newVal) {
        if(newVal !== undefined) {
          $scope.renderOwl();
        }
      });

      $scope.$watch('length', function(newVal) {
        if(newVal !== undefined && newVal > 0) {
          $scope.renderOwl();
        }
      });

      $scope.renderOwl = function() {
        $timeout(function() {
          if($scope.owl != undefined) {
            $scope.owl.destroy();
          }
          $($element).owlCarousel({
            autoPlay: "true",
            pause: "true",
            interval: 5000,
            responsive: $scope.responsive,
            navigation: true,
            navigationText : ["<i class='fa fa-caret-right'></i>","<i class='fa fa-caret-right'></i>"]
          });

          $scope.owl = $($element).data('owl.carousel');
          $element.find('.owl-item').click(function() {
            var index = $(this).index('.owl-item');
            $scope.$emit('owlItemClicked', {index: index});
          });
        });
      };
    }
  };
}]);
