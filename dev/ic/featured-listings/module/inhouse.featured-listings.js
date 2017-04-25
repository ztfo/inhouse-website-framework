angular.module('ihframework')
  .directive('ihFeaturedListings', ['inhouseApi', '$timeout', 'listing', function(inhouseApi, $timeout, listing) {
    return {
      template: '<ng-include src="templateUrl" class="{{classes}}"></ng-include>',
      restrict: 'E',
      scope: {
        classes: "@classes",
        pull: '@',
        slider: '=',
        config: '=',
        header: '@',
        filters: '=',
        title: '='
      },
      controller: function($rootScope, $scope, userDataService, $element) {
        $scope.$watch('filters', function(newVal) {
          if (newVal !== undefined) {
            if (newVal['only-mine'] !== undefined) {
              delete newVal['only-mine'];
              newVal.status = 'featured';
            }
            $scope.viewMore = $.param(newVal);
          }
        });
        $scope.$watch('config', function(newVal) {
          if (newVal !== undefined) {
            $scope.templateUrl = 'build/templates/ic/featured-listings/template/' + $scope.config + '-inhouse.featured-listings.html';
          } else {
            $scope.templateUrl = 'build/templates/ic/featured-listings/template/s1-inhouse.featured-listings.html';
          }
        });

        $scope.maxFeaturedListings = $rootScope.theWebsiteData.maxFeaturedListings || 5;
        $scope.LandingComponent = $rootScope.theWebsiteData.FeaturedListings;
        $scope.agent = $rootScope.theUserData;
        $scope.listingLoaders = 10;

        //default responsive for the owl
        $scope.responsive = {
          0: {
            items: 1
          },
          480: {
            items: 1
          },
          768: {
            items: 2
          },
          1024: {
            items: 4
          }
        };
        $scope.range = function(min, max, step) {
          step = step || 1;
          var input = [];
          for (var i = min; i < max; i += step) {
            input.push(i);
          }
          return input;
        };

        $scope.$on('storyLoaded', function(event, args) {
          $scope.listingLoaders = 0;
          $scope.query = args.featuredListings.query;
          $scope.homes = args.featuredListings.listings;
        });

        inhouseApi.newApi.featuredListings($scope.filters).success(function(response) {
          $scope.listingLoaders = 0;

          $scope.homes = _.map(response.data.listings, function(data) {
            return listing.hydrate(data);
          });
        });
      }
    };
  }]);
