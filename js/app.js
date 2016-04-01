angular.module('inhouseApp', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'landing.htm',
		controller: 'mainController'
	})
	.when('/search-mls', {
		templateUrl: 'results.htm',
		controller: 'searchController',
		reloadOnSearch: false
	})
	.when('/listing/:mls', {
		templateUrl: 'listing.htm',
		controller: 'listingController'
	})
	.when('/:content', {
		templateUrl: 'content.htm',
		controller: 'contentController'
	})
	.when('/bio/:agent/', {
		templateUrl: 'bios.htm',
		controller: 'bioController'
	});

//	$locationProvider.html5Mode(true);
})
.controller('mainView', function($scope) {
	$scope.agent = window.agentSettings;
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
