angular.module('ihframework')
.directive('ihTestimonials', ['inhouseApi', '$timeout', function(inhouseApi, $timeout) {
  return {
    template: '<ng-include src="templateUrl"></ng-include>',
    restrict: 'E',
    scope: {
      testimonial: '@',
      classes: '@',
      source: '@',
      max: '@',
      config: '=',
      responsive: '=',
      listing: '='
    },
    controller: function($rootScope, $scope, $http, $element) {
      $scope.$watch('config', function(newVal) {
        if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/testimonials/template/' + $scope.config + '-inhouse.testimonials.html';
        } else {
          $scope.templateUrl = 'build/templates/ic/testimonials/template/s1-inhouse.testimonials.html';
        }
      });

      $scope.$watch('responsive', function(newVal) {
        if(newVal !== undefined) {
          $scope.responsive = newVal;
        }
      });

      $scope.$watch('responsive', function(newVal) {
        if(newVal !== undefined) {
          $scope.responsive = newVal;
        }
      });

      $scope.testimonialFilter = function() {
        var filtered = [];
        angular.forEach($scope.testimonials, function(value, key) {
          if(value.hidden === undefined || value.hidden == false) {
            this.push(value);
          }
        }, filtered);
        $scope.testimonials = filtered;
      };

      $scope.next = function(id) {
        $element.find('#' + id).carousel('next');
      };
      $scope.prev = function(id) {
        $element.find('#' + id).carousel('prev');
      };
      $scope.LandingComponent = $rootScope.theWebsiteData.LandingComponent;
      $scope.agent = $rootScope.theUserData;
      $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
          input.push(i);
        }
        return input;
      };

      if($rootScope.theWebsiteData.lender !== undefined) {
        $scope.lender = $rootScope.theWebsiteData.lender;
      }

      inhouseApi.newApi.getTestimonials().success(function(response) {
        $scope.testimonials = response.data;
        $scope.testimonialFilter();
      });
    },
    link: function(scope, element, attrs) {
    }
  };
}]);
