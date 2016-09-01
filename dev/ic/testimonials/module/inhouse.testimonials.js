angular.module('ihframework')
.directive('ihTestimonials', ['$timeout', 'userData', function($timeout, userData) {
  return {
    template: '<ng-include src="templateUrl"></ng-include>',
    restrict: 'E',
    scope: {
      testimonial: '@',
      classes: '@',
      source: '@',
      max: '@',
      config: '='
    },
    controller: function($rootScope, $scope, $http, userDataService, userData, $element) {
      $scope.$watch('config', function(newVal) {
        if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/testimonials/template/' + $scope.config + '-inhouse.testimonials.htm';
        } else {
          $scope.templateUrl = 'build/templates/ic/testimonials/template/s1-inhouse.testimonials.htm';
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
      
      if (typeof $scope.source === 'undefined' || $scope.source == 'hybrid' || $scope.source == 'zillow' || $scope.source == '') {
        $scope.showZillow = true;
        $qT = userData.getTestimonials();
        if($qT !== undefined) {
          $qT.success(function(args){
            var testimonials = args.testimonials;
            
            if ((typeof $scope.source === 'undefined' || $scope.source == 'hybrid') && typeof $scope.$root.theWebsiteData.testimonials === 'object') {
              for (var i = 0; i < $scope.$root.theWebsiteData.testimonials.length; i++) {
                testimonials.unshift($scope.$root.theWebsiteData.testimonials[i]);
              }
            }
            
            $scope.testimonials = testimonials;
          });
        } else {
          if (typeof $rootScope.theWebsiteData.testimonials !== 'undefined') {
            $scope.showZillow = false;
            $scope.testimonials = $rootScope.theWebsiteData.testimonials;
          }
        }
      } else {
        if (typeof $rootScope.theWebsiteData.testimonials !== 'undefined') {
          $scope.testimonials = $rootScope.theWebsiteData.testimonials;
        }
      }
    },
    link: function(scope, element, attrs) {
    }
  };
}]);
