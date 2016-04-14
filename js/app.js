angular.module('inhouseApp', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'landing.htm',
		controller: 'mainController'
	})
	.when('/search-mls', {
		templateUrl: 'pages/results/' + window.storySettings.resultsConfig + '-results.htm',
		controller: 'searchController',
		reloadOnSearch: false
	})
	.when('/listing/:mls', {
		templateUrl: 'pages/listing/' + window.storySettings.listingConfig + '-listing.htm',
		controller: 'listingController'
	})
	.when('/privacy', {
		templateUrl: 'pages/system/' + window.storySettings.privacyConfig + '-visitor-privacy.htm',
		controller: 'privacyController'
	})
	.when('/:content', {
		templateUrl: 'pages/content/' + window.storySettings.contentConfig + '-content.htm',
		controller: 'contentController'
	})
	.when('/bio/:agent/', {
		templateUrl: 'pages/bios/' + window.storySettings.bioConfig + '-bios.htm',
		controller: 'bioController'
	})
;

//	$locationProvider.html5Mode(true);
})
.controller('mainView', ['inhouseApi', '$scope', function(inhouseApi, $scope) {
	$scope.agent = window.agentSettings;
	if(typeof Storage !== 'undefined') {
		if(typeof localStorage.inhouseAgentUser !== 'undefined') {
			$scope.inhouseAgentUserLoggedIn = true;
		} else {
			$scope.inhouseAgentUserLoggedIn = false;
		}
	}
	$scope.submitNewUser = (function($scope) {
			return function() {
			inhouseApi.getData({resource: 'new-lead', name: $scope.newAgent.name, email: $scope.newAgent.email, phone: $scope.newAgent.phone}).success(function(result) {
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
