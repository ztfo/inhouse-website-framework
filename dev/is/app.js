angular.module('ihframework', ['ngRoute', 'ui.bootstrap', 'frameworkTemplates', 'ngMap', 'ngGPlaces', 'duScroll', 'angular-pinterest', 'angulartics', 'angulartics.facebook.pixel',
   'angulartics.google.analytics'])
.run(function($http, $rootScope, userDataService, $document){
  $rootScope.theUserData = userDataService.userData;
  $rootScope.theWebsiteData = userDataService.storySettings;

  $rootScope.scrollToElement = function(id) {
    $document.scrollToElement(angular.element(document.getElementById('ih-component-' + id)), 0, 1000);
  };

  $('.ih-scroll-nav-link').on('click', function(event) {
    $rootScope.scrollToElement($(this).attr('href'));

    event.preventDefault();
    return false;
  });
})
.config(function($routeProvider, $locationProvider, $httpProvider, userDataServiceProvider, ngGPlacesAPIProvider) {

  ngGPlacesAPIProvider.setDefaults({
    radius: 13200,
    nearbySearchKeys: ['name','rating','vicinity', 'opening_hours'],
  });

//	$httpProvider.defaults.withCredentials = true;

  $routeProvider.when('/', {
    template: '<ih-landing-layout-wrapper layout="layout"></ih-landing-layout-wrapper>',
    controller: 'mainController'
  })
  .when('/search-mls', {
    templateUrl: 'build/templates/ip/results/' + ( userDataServiceProvider.storyJson.resultsConfig || 's1') + '-results.html',
    controller: 'searchController',
    reloadOnSearch: false
  })
  .when('/listing/:mls', {
    templateUrl: 'build/templates/ip/listing/' + (userDataServiceProvider.storyJson.listingConfig || 's1') + '-listing.html',
    controller: 'listingController'
  })
  .when('/privacy', {
    templateUrl: 'build/templates/ip/system/' + (userDataServiceProvider.storyJson.privacyConfig || 's1') + '-visitor-privacy.html',
    controller: 'privacyController'
  })
  .when('/missing', {
    templateUrl: 'build/templates/ip/system/404.html'
  })
  .when('/:content', {
    templateUrl: 'build/templates/ip/content/' + (userDataServiceProvider.storyJson.contentConfig  || 's1') + '-content.html',
    controller: 'contentController'
  })
  .when('/bio/:agent/', {
    templateUrl: 'build/templates/ip/bios/' + (userDataServiceProvider.storyJson.bioConfig || 's1') + '-bios.html',
    controller: 'bioController'
  })
  .when('/subdivision/:sub', {
    templateUrl: 'build/templates/ip/subdivisions/' + (userDataServiceProvider.storyJson.subdivConfig || 's1') + '-subdivision.inhouse.html',
    controller: 'subdivisionController'
  })
  .when('/subdivision/:sub/floorplan/:floorplan', {
    templateUrl: 'build/templates/ip/subdivisions/' + (userDataServiceProvider.storyJson.subdivConfig || 's1') + '-subfloorplan.inhouse.html',
    controller: 'subfloorplanController'
  })
  .otherwise({
    templateUrl: 'build/templates/ip/system/404.html'
  });

//	$locationProvider.htmll5Mode(true);
})
.controller('mainView', ['$rootScope', 'inhouseApi', '$scope', 'ihLead', function($rootScope, inhouseApi, $scope, ihLead) {
  $scope.lead = ihLead;

  $rootScope.$on("$routeChangeSuccess", function(e, data) {
    $scope.controller = data.controller;
    $scope.$broadcast('viewChanged', data.controller);

    ihLead.dismissModal();

    if(typeof window.ga !== 'undefined') {
      window.ga('send', 'pageview', { page: window.location.href });
    }

  });

  $scope.agent = $rootScope.theUserData;
  $scope.story = $rootScope.theWebsiteData;

  $scope.signIn = function() {
    ihLead.openModal(function() {
    });
  };

  $scope.navbar = $rootScope.theWebsiteData.NavBar;

  $scope.scrollToElement = function(id) {
    $document.scrollToElement(angular.element(document.getElementById('ih-component-' + id)), 0, 1000);
  };

  $scope.scrollToAgent = function(id) {
    $rootScope.$broadcast('agents clicked', {data: false});
    $document.scrollToElement(angular.element(document.getElementById(id)), 0, 1000);
  };

  $scope.scrollToLender = function(id) {
    $rootScope.$broadcast('lenders clicked', {data: true});
    $document.scrollToElement(angular.element(document.getElementById(id)), 0, 1000);
  };
}])

.directive('openTab', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var href = element.href;
          if(attrs.ngHref.includes('http')) {  // replace with your condition
            element.attr("target", "_blank");
          }
        }
    };
});

// back to top

$(document).ready(function () {
  $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
          $('.ih-scroll-up').fadeIn();
      } else {
          $('.ih-scroll-up').fadeOut();
      }
  });

  $('.ih-scroll-up').click(function () {
      $("html, body").animate({
          scrollTop: 0
      }, 600);
      return false;
  });
});
