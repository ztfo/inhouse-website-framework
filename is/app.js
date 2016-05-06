angular.module('inhouseApp', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
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
	.otherwise({
		templateUrl: 'ip/system/404.htm'
	});
;

//	$locationProvider.html5Mode(true);
})
.controller('mainView', ['inhouseApi', '$scope', function(inhouseApi, $scope) {
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
			inhouseApi.getData({resource: 'new-lead', name: $scope.register.name, email: $scope.register.email, phone: $scope.register.phone}).success(function(result) {
				if(typeof Storage !== 'undefined') {
					if(typeof result.id === 'undefined') {
						$scope.inhouseAgentUserLoggedIn = false;
						delete localStorage.inhouseAgentUser;
						$('#accountModal').attr('data-success-register', 'false');
					} else {
						$scope.inhouseAgentUserLoggedIn = true;
						localStorage.inhouseAgentUser = result.id;
						window.inhouseAgentUser = result.id;
						$('#accountModal').attr('data-success-register', 'true');
						$('#accountModal').modal('hide');
					}
				}
			});
		};
	});
	$scope.submitLogin = (function($scope) {
			return function() {
			inhouseApi.getData({resource: 'new-lead', name: $scope.login.name, email: $scope.login.email, phone: $scope.login.phone}).success(function(result) {
				if(typeof Storage !== 'undefined') {
					if(typeof result.id === 'undefined') {
						$scope.inhouseAgentUserLoggedIn = false;
						delete localStorage.inhouseAgentUser;
						$('#accountModal').attr('data-success-register', 'false');
					} else {
						$scope.inhouseAgentUserLoggedIn = true;
						localStorage.inhouseAgentUser = result.id;
						window.inhouseAgentUser = result.id;
						$('#accountModal').attr('data-success-register', 'true');
						$('#accountModal').modal('hide');
					}
				}
			});
		};
	})($scope);
}]);

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
