angular.module('ihframework', ['ngRoute', 'ui.bootstrap', 'userData', 'templates'])
.run(function($http, $rootScope, userDataService){
	// $http.post('https://inhouse-api.herokuapp.com/auth/login?email=josh@getinhouse.io&password=Test').success(
  //   function(res){
  //     // console.log('mainCtrl res: ', res);
  //   }
  // );
	$rootScope.theUserData = userDataService.userData;
	$rootScope.theWebsiteData = userDataService.storySettings;

})
.config(function($routeProvider, $locationProvider, $httpProvider) {

	$httpProvider.defaults.withCredentials = true;

	$routeProvider.when('/', {
		template: '<ih-landing-layout></ih-landing-layout>',
		controller: 'mainController'
	})
	.when('/search-mls', {
		templateUrl: 'ip/results/' + (window.storySettings.resultsConfig || 's1') + '-results.htm',
		controller: 'searchController',
		reloadOnSearch: false
	})
	.when('/listing/:mls', {
		templateUrl: 'ip/listing/' + (window.storySettings.listingConfig || 's1') + '-listing.htm',
		controller: 'listingController'
	})
	.when('/privacy', {
		templateUrl: 'ip/system/' + (window.storySettings.privacyConfig || 's1') + '-visitor-privacy.htm',
		controller: 'privacyController'
	})
	.when('/missing', {
		templateUrl: 'ip/system/404.htm'
	})
	.when('/:content', {
		templateUrl: 'ip/content/' + (window.storySettings.contentConfig  || 's1') + '-content.htm',
		controller: 'contentController'
	})
	.when('/bio/:agent/', {
		templateUrl: 'ip/bios/' + (window.storySettings.bioConfig || 's1') + '-bios.htm',
		controller: 'bioController'
	})
	.when('/subdivision/:sub', {
		templateUrl: 'ip/subdivisions/' + (window.storySettings.subdivConfig || 's1') + '-subdivision.inhouse.htm',
		controller: 'subdivisionController'
	})
	.when('/subdivision/:sub/floorplan/:floorplan', {
		templateUrl: 'ip/subdivisions/' + (window.storySettings.subdivConfig || 's1') + '-subfloorplan.inhouse.htm',
		controller: 'subfloorplanController'
	})
	.otherwise({
		templateUrl: 'ip/system/404.htm'
	});

//	$locationProvider.html5Mode(true);
})
.controller('mainView', ['$rootScope', 'inhouseApi', '$scope', function($rootScope, inhouseApi, $scope) {
	$rootScope.$on("$routeChangeSuccess", function(e, data) {
		$scope.$broadcast('viewChanged', data.controller);
	});
	$scope.agent = window.agentSettings;
	$scope.story = window.storySettings;
	$scope.freebies = true;
	$scope.max = window.storySettings.maxSearchNoLead || 3;

	if(typeof Storage !== 'undefined') {
		if(typeof localStorage.inhouseAgentUser !== 'undefined') {
			$scope.inhouseAgentUserLoggedIn = true;
		} else {
			$scope.inhouseAgentUserLoggedIn = false;
		}
	}

	if(typeof Storage !== 'undefined') {
		if(typeof localStorage.inhouseSearchFreebies !== 'undefined' && localStorage.inhouseSearchFreebies === 'false') {
			$scope.freebies = false;
		}
	}
	$scope.viewFreebies = function() {
		if(typeof Storage !== 'undefined') {
			if(typeof localStorage.inhouseSearchFreebies === 'undefined' && localStorage.inhouseSearchFreebies !== 'false') {
				localStorage.inhouseSearchFreebies = 'false';
				localStorage.inhouseSearchCount = 0;
				$scope.freebies = false;
				$('#accountModal').modal('hide');
			}
		}
	};
	$scope.submitRegister = (function($scope) {
			return function() {
			inhouseApi.getData({resource: 'new-lead', name: $scope.name, email: $scope.email, phone: $scope.phone}).success(function(result) {
				if(typeof Storage !== 'undefined') {
					if(typeof result.id === 'undefined') {
						$scope.inhouseAgentUserLoggedIn = false;
						delete localStorage.inhouseAgentUser;
						$('#accountModal').attr('data-success-register', 'false');
						$scope.$broadcast('loginChanged', false);
					} else {
						$scope.inhouseAgentUserLoggedIn = true;
						$scope.$broadcast('loginChanged', true);
						localStorage.inhouseAgentUser = result.id;
						window.inhouseAgentUser = result.id;
						$('#accountModal').attr('data-success-register', 'true');
						$('#accountModal').modal('hide');
					}
				}
			});
		};
	})($scope);
	$scope.submitLogin = (function($scope) {
			return function() {
			inhouseApi.getData({resource: 'new-lead', name: $scope.name, email: $scope.email, phone: $scope.phone}).success(function(result) {
				if(typeof Storage !== 'undefined') {
					if(typeof result.id === 'undefined') {
						$scope.inhouseAgentUserLoggedIn = false;
						delete localStorage.inhouseAgentUser;
						$('#accountModal').attr('data-success-register', 'false');
						$scope.$broadcast('loginChanged', false);
					} else {
						$scope.inhouseAgentUserLoggedIn = true;
						localStorage.inhouseAgentUser = result.id;
						window.inhouseAgentUser = result.id;
						$('#accountModal').attr('data-success-register', 'true');
						$('#accountModal').modal('hide');
						$scope.$broadcast('loginChanged', true);
					}
				}
			});
		};
	})($scope);
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
