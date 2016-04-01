angular.module('inhouseApp')
  .directive('ihFeaturedListings', ['$timeout', function ($timeout) {
    return {
      templateUrl: 'inhouse.components/featured-listings/template/inhouse.featured-listings.htm',
      restrict: 'E',
      replace: true,
      controller: function ($scope) {
        $scope.LandingComponent = window.storySettings.FeaturedListings;
        $scope.agent = window.agentSettings;
        $scope.listingLoaders = 10;
        $scope.range = function (min, max, step) {
          step = step || 1;
          var input = [];
          for (var i = min; i < max; i += step) {
            input.push(i);
          }
          return input;
        };
      },
      link: function (scope, element, attrs) {
        $timeout(function () {
          element.find('.ih-ft-carousel').owlCarousel({
            mouseDrag: false,
            items: 4,
            nav: true,
            margin: 10,
            autoplay: true,
            autoplayHoverPause: true,
            responsive: {
              0: {
                item: 1
              },
              480: {
                item: 1
              },
              768: {
                item: 2
              },
              1024: {
                item: 4
              }
            }
          });
        });

        scope.$on('storyLoaded', function (event, args) {
          //destroy owl carousel
          scope.listingLoaders = 0;
          element.find('.ih-ft-carousel').data('owlCarousel').destroy()
          element.find('.ih-ft-carousel').removeClass('owl-carousel owl-loaded owl-text-select-on')

          scope.homes = args['featuredListings'].listings;

          $timeout(function () {
            element.find('.ih-ft-carousel').owlCarousel({
              mouseDrag: false,
              items: 4,
              nav: true,
              margin: 10,
              autoplay: true,
              autoplayHoverPause: true,
              responsive: {
                0: {
                  item: 1
                },
                480: {
                  item: 1
                },
                768: {
                  item: 2
                },
                1024: {
                  item: 4
                }
              }
            });
          });
        });
      }
    };
}]);