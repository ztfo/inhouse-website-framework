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
      
      $scope.$watch('testimonials', function(newVal) {
        if(newVal !== undefined && newVal.length > 0) {
          $scope.renderOwl();
        }
      });
      
      if (typeof $scope.source === 'undefined' || $scope.source == 'hybrid' || $scope.source == 'zillow' || $scope.source == '') {
        $scope.showZillow = true;
        userData.getTestimonials().success(function(args){
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
          $scope.testimonials = $rootScope.theWebsiteData.testimonials;
        }
      }
      $scope.renderOwl = function() {
        $timeout(function() {
          if ($element.find('.owl-carousel').length > 0) {
            var params = {
              lazyLoad : true,
              lazyEffect : "fade",
              navigation: true,
              navigationText : ["<i class='fa fa-caret-left'></i>","<i class='fa fa-caret-right'></i>"],
            };
            if (typeof $scope.max !== 'undefined' && $scope.max != '') {
              $scope.max = parseInt($scope.max);
              params.items = $scope.max;
            }
            
            var testimonialsIndex = 0;
            $scope.$root.theWebsiteData.landingLayout.map(function(item, index, arr) {
              if (item.responsive) {
                testimonialsIndex = index;
              }
            });
            
            if ($scope.$root.theWebsiteData.landingLayout[testimonialsIndex].responsive) {
              params.responsive = $scope.$root.theWebsiteData.landingLayout[testimonialsIndex].responsive;
            }
            $element.find('.owl-carousel').owlCarousel(params);
          } else {
            var params = {
              pause: "true",
              interval: 9999,
              navigation: true
            };
            $element.carousel(params);
          }
        });
      };
      
    },
    link: function(scope, element, attrs) {
    }
  };
}]);
