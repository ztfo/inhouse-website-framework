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
.controller('mainView', ['inhouseApi', '$scope', function(inhouseApi, $scope) {
	$scope.agent = window.agentSettings;
	$scope.submitNewUser = function() {
		inhouseApi.getData({resource: 'new-lead', name: $scope.newAgent.name, email: $scope.newAgent.email, phone: $scope.newAgent.phone}).success(function(result) {
			if(typeof Storage !== 'undefined') {
				if(typeof result.id === 'undefined') {
					delete localStorage.inhouseAgentUser;
					$('#accountModal').attr('data-success-register', 'false');
				} else {
					localStorage.inhouseAgentUser = result.id;
					window.inhouseAgentUser = result.id;
					$('#accountModal').attr('data-success-register', 'true');
					$('#accountModal').modal('hide');
				}
			}
		});
	};
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
