angular.module('ihframework')
.controller('contentController', ['$http', '$rootScope', '$compile', '$templateRequest', '$scope', '$routeParams', 'inhouseApi', '$timeout', '$sce', '$location', function($http, $rootScope, $compile, $templateRequest, $scope, $route, inhouseApi, $timeout, $sce, $location) {

	$scope.showTab = 'press-coverage';
	$scope.showMLSTab = 'us';
	$scope.showOrderTab = 'landing';

	$scope.togglePressTabs = function(tab){
		$scope.showTab = tab;
	};
	$scope.toggleMLSTabs = function(tab){
		$scope.showMLSTab = tab;
	};
	$scope.toggleOrderTabs = function(tab){
		$scope.showOrderTab = tab;
	};
	
	//stripe checkout functions
	$scope.stripeHandler = StripeCheckout.configure({
		key: 'pk_live_BkoKtrkTnUTgYUGXnMAZBY6Q',
		key: 'pk_test_BxiHKsC5YWi8C59M3QAYcIix',
		image: 'https://s3.amazonaws.com/stripe-uploads/acct_16nvhMFOqbCIiYPomerchant-icon-1442977590567-stripe-icon.jpg',
		locale: 'auto',
		closed: function() {
		},
		token: function(token) {
			$http.put('http://localhost/inhouse-api/inhouse-api/public/api/v1/me/card', {token: token})
			.success(function(response) {
			})
			.error(function(response) {
			});
		}
	});

	$scope.subscription = {};
	$scope.purchasePropertyWebsite = function() {
		$scope.subscriptions = {
			'single-story': {
				description: "Single Property Story",
				amount: 2900
			},
			'agent-pro': {
				description: "Agent Pro Property Stories",
				amount: 6900
			},
			'agent-unlimited': {
				description: "Agent Unlimited Property Stories",
				amount: 9900
			}
		};
		$scope.stripeHandler.open({
			name: 'INHOUSE REAL ESTATE MARKETING',
	    description: $scope.subscriptions[$scope.subscription.subscriptionType].description,
	    zipCode: true,
	    amount: $scope.subscriptions[$scope.subscription.subscriptionType].amount
		});
	};
	
	if(typeof $rootScope.theUserData.content[$route.content] === 'undefined') {
		var content = $rootScope.theUserData.content;
		for (var i = 0; i < content.length; i++) {
			if(content[i].key == $route.content) {
				$scope.content = content[i];
				break;
			}
		}
	} else {
		$scope.content = $rootScope.theUserData.content[$route.content];
	}
	if(typeof $rootScope.theWebsiteData.featuredCommunities == 'object') {
		$scope.featuredCommunities = $rootScope.theWebsiteData.featuredCommunities;
	} else {
		$scope.featuredCommunities =
			[{"name":"Canada Hills","value":"Canada Hills"},{"name":"Cobblestone","value":"Cobblestone"},{"name":"Continental Ranch","value":"Continental Ranch"},{"name":"Continental Reserve","value":"Continental Reserve"},{"name":"Dorado CC Estates","value":"Dorado Country Club Estates"},{"name":"Dove Mountain","value":"dove mountain*"},{"name":"Fairfield","value":"Fairfield"},{"name":"Gladden Farms","value":"Gladden Farms"},{"name":"Hillcrest at Wingate","value":"Hillcrest at Wingate"},{"name":"Indian Ridge","value":"Indian Ridge"},{"name":"La Paloma","value":"La Paloma"},{"name":"La Reserve","value":"La Reserve"},{"name":"Midvale","value":"Midvale"},{"name":"None","value":"None"},{"name":"North Ranch","value":"North Ranch"},{"name":"Oro Valley CC","value":"oro valley c*"},{"name":"Rancho Del Lago","value":"Rancho Del Lago"},{"name":"Rancho Sahuarita","value":"Rancho Sahuarita"},{"name":"Rancho Vistoso","value":"Rancho Vistoso"},{"name":"Rita Ranch","value":"Rita Ranch"},{"name":"Sabino Springs","value":"Sabino Springs"},{"name":"Sabino Vista","value":"Sabino Vista"},{"name":"Salida Del Sol","value":"Salida Del Sol"},{"name":"Sam Hughes","value":"Sam Hughes"},{"name":"Silverado Hills","value":"Silverado Hills"},{"name":"Skyline CC","value":"oro valley c*"},{"name":"Starr Pass","value":"Starr Pass"},{"name":"Sun City Oro Valley","value":"Sun City Oro Valley"},{"name":"Tucson CC","value":"tucson c*"},{"name":"Tucson National CC","value":"tucson national*"},{"name":"Ventana CC","value":"ventana c*"}];
	}
	if(typeof $scope.content === 'undefined' || typeof $scope.content.title === 'undefined' || typeof $scope.content.content === 'undefined') {
		if(typeof $scope.content !== 'undefined' && typeof $scope.content.contentUrl !== 'undefined') {

		} else {
			$location.path('/missing');
		}
	} else {
		$scope.$parent.windowTitle = ' | ' + $scope.content.title;
	}

	$timeout(function() {
		$rootScope.$on("$includeContentLoaded", function(event, templateName){
			$rootScope.$broadcast('listingLoaded', {address: $rootScope.theUserData.contactAddress + ' ' + $rootScope.theUserData.contactAddress2});
		});

		$rootScope.$broadcast('listingLoaded', {address: $rootScope.theUserData.contactAddress + ' ' + $rootScope.theUserData.contactAddress2});
		$scope.$broadcast('contentLoaded', $scope.listing);
	});
}]);
