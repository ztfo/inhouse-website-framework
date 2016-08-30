angular.module('ihframework')
    .directive('ihTestimonials', ['$timeout', 'userData', function($timeout, userData) {
        return {
            templateUrl: function(el, attrs) {
                return 'build/templates/ic/testimonials/template/' + (attrs.config || 's1') + '-inhouse.testimonials.htm';
            },
            restrict: 'E',
            replace: true,
            scope: {
                testimonial: '@',
                classes: '@',
                source: '@',
                max: '@'
            },
            controller: function($rootScope, $scope, $http, userDataService, userData) {

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
                
                if (typeof $scope.source !== 'undefined' && $scope.source == 'storySettings') {
                    if (typeof $rootScope.theWebsiteData.testimonials !== 'undefined') {
                        $scope.testimonials = $rootScope.theWebsiteData.testimonials;
                    }
                }
            },
            link: function(scope, element, attrs) {
                scope.renderOwl = function() {
                  $timeout(function() {
                      if (element.find('.owl-carousel').length > 0) {
                          var params = {};
                          if (typeof scope.max !== 'undefined' && scope.max != '') {
                              scope.max = parseInt(scope.max);
                              params.items = scope.max;
                          }

                          var testimonialsIndex = 0;
                          scope.$root.theWebsiteData.landingLayout.map(function(item, index, arr) {
                              if (item.responsive) {
                                  testimonialsIndex = index;
                              }
                          });

                          if (scope.$root.theWebsiteData.landingLayout[testimonialsIndex].responsive) {
                              params.responsive = scope.$root.theWebsiteData.landingLayout[testimonialsIndex].responsive;
                          }
                          element.find('.owl-carousel').owlCarousel(params);
                      } else {
                          var params = {
                              pause: "true",
                              interval: 9999
                          };
                          element.carousel(params);
                      }
                  });
                };
                if (typeof scope.source === 'undefined' || scope.source == 'hybrid' || scope.source == 'zillow') {
                    scope.showZillow = true;
                    userData.getTestimonials().success(function(args){
                        scope.testimonials = [];
                        scope.testimonials = args.testimonials;

                        if ((typeof scope.source === 'undefined' || scope.source == 'hybrid') && typeof scope.$root.theWebsiteData.testimonials === 'object') {
                            for (var i = 0; i < scope.$root.theWebsiteData.testimonials.length; i++) {
                                scope.testimonials.unshift(scope.$root.theWebsiteData.testimonials[i]);
                            }
                        }
                        
                        scope.renderOwl();
                    });
                } else if(scope.testimonials != undefined && scope.testimonials.length > 0) {
                  scope.renderOwl();
                }
            }
        };
    }]);
