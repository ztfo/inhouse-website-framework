angular.module('ihframework')
.directive('ihTestimonials', ['inhouseApi', '$timeout', 'userData', function(inhouseApi, $timeout, userData) {
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
    controller: function($rootScope, $scope, $http, userDataService, userData, $element) {
      $scope.$watch('config', function(newVal) {
        if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/testimonials/template/' + $scope.config + '-inhouse.testimonials.html';
        } else {
          $scope.templateUrl = 'build/templates/ic/testimonials/template/s1-inhouse.testimonials.html';
        }
      });

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
      
      inhouseApi.newApi.getTestimonials().success(function(response) {
        $scope.testimonials = response.data;
      });
    },
    link: function(scope, element, attrs) {
    }
  };
}]);
