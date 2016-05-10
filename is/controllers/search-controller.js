angular.module('inhouseApp')
.controller('searchController', ['$rootScope', '$timeout', '$scope', 'inhouseApi', '$routeParams', '$location', '$window', function($rootScope, $timeout, $scope, inhouseApi, $routeParams, $location, $window) {
	$scope.$on('$destroy', function() {
		//prevent the modal from persisting
		$('#accountModal').off('hidden.bs.modal');
		$('#accountModal').modal('hide');
	});

	//init lead capture search counting, if in local storage if not zero
	$scope.searchCount = 0;
	if(typeof Storage !== 'undefined') {
		if(typeof localStorage.inhouseSearchCount !== 'undefined') {
			$scope.searchCount = localStorage.inhouseSearchCount;
		}
	}

	$rootScope.$broadcast('hideFooter');	
	$scope.$on('$destroy', function() {
		$rootScope.$broadcast('showFooter');
	});
	
	//responsive screensize hiding the map
	if($window.innerWidth < 1367) {
		$scope.mapShown = false;
	} else {
		$scope.mapShown = true;
	}

	//start off by getting location parameters
	$scope.getGets = function() {
		var gets = {};
		for (var property in $routeParams) {
			if($routeParams.hasOwnProperty(property)) {
				gets[property] = $routeParams[property];
			}
		}
		$scope.filters = gets;
		if(typeof $scope.filters['near-me'] !== 'undefined') {
			if(typeof navigator.geolocation !== 'undefined') {
				navigator.geolocation.getCurrentPosition(
					(function(scope) {
						return function(geolocation) {
							window.geolocation = geolocation.coords.latitude + ',' + geolocation.coords.longitude;
							scope.searchMLS();
						};
					})($scope),
					(function(scope) {
						return function() {
							scope.failedLocation = true;
						};
					}));
			}
		}
	};
	
	//some logic to prevent double loading
	$scope.noWipe = false;
	$scope.firstLoad = true;

	//these hide and show infoWindows
	$scope.focusListing = function(listing) {
		$scope.$broadcast('focusListing', listing);
	};
	$scope.blurListing = function(listing) {
		$scope.$broadcast('blurListing', listing);
	};

	//loads more listings, increments the pages
	$scope.moreListings = function() {
		$scope.noWipe = true;
		if(typeof $scope.filters.page === 'undefined') {
			$scope.filters.page = 2;
		} else {
			$scope.filters.page ++;
		}
	};
	
	//creates an array to use for ng-repeat
	$scope.range = function(min, max, step) {
		step = step || 1;
		var input = [];
		for (var i = min; i < max; i += step) {
				input.push(i);
		}
		return input;
	};

	//toggles the map view on the results page
	$scope.toggleMaps = function() {
		if($scope.mapShown) {
			$scope.mapShown = false;
			$timeout(function() {
				$scope.$broadcast('refreshMap');	
			});
		} else {
			$scope.mapShown = true;
			$timeout(function() {
				$scope.$broadcast('refreshMap');	
			});
		}
	};

	//search mls 
	$scope.searchMLS = function() {
		$scope.firstLoad = false;

		if(typeof Storage !== 'undefined') {
			if(typeof localStorage.inhouseAgentUser === 'undefined') {
				if(localStorage.inhouseSearchCount == 0 && localStorage.inhouseSearchFreebies == 'false') {
					$scope.searchCount = 1;
					localStorage.inhouseSearchCount = 1;
				} else {
					localStorage.inhouseSearchCount = $scope.searchCount;
				}
				var max = window.storySettings.maxSearchNoLead || 3;
				if($scope.searchCount > max) {
					$('#accountModal').modal('show');
					$('#accountModal').off('hidden.bs.modal');
					$('#accountModal').on('hidden.bs.modal', (function(scope) {
						return function() {
							$scope.searchMLS();
						};
					})($scope));
					return;
				} else {
					$scope.searchCount ++;
				}
			}
		}

		if(Object.keys($scope.filters).length > 0) {

			$scope.listingLoaders = 15;
			var params = $scope.filters;

			inhouseApi.getData({resource: 'search-mls', params: params}).success(function(response) {
				if(typeof response.response != 'undefined' && response.response.length > 0) {
					$scope.totalListings = response.response[0].total_results;
					$scope.displayListings = response.response.length * ($scope.filters.page || 1);
				} else {
					$scope.totalListings = 0;
					$scope.displayListings = 0;
				}

				$scope.listingLoaders = 0;
				if(!$scope.noWipe) {
					$scope.listings = [];
				}

				$scope.noWipe = false;
				if(typeof $scope.listings == 'undefined') {
					$scope.listings = [];
				}

				for (var i = 0; i < response.response.length; i++) {
					$scope.listings.push(response.response[i]);
				}

				$scope.$broadcast('resultsLoaded', $scope.listings);
				$scope.toggleListView = function() {
					if($scope.showListView) {
						$scope.showListView = false;
					} else {
						$scope.showListView = true;
					}
				};
			});
		}
	};

	//get the get parameters
	$scope.getGets();

	$scope.removeFilter = function(filter) {
		if(typeof $scope.filters[filter] != 'undefined') {
			delete $scope.filters[filter];
		}
	};

	//refresh gets
	$scope.$on('$locationChangeSuccess', function(event, oldUrl, newUrl) {
		$scope.getGets();
	});

	//trigger mls search on $scope.filter change
	$scope.$watchCollection('filters', function(newFilters, oldFilters) {
		$scope.$broadcast('filtersChanged', newFilters);
		if(newFilters == oldFilters) {
			return;
		}
		if(!$scope.noWipe) {
			if($scope.filters.page != 1 && !$scope.firstLoad) {
				$scope.changedPage = true;
				$scope.filters.page = 1;
			}
			$scope.listings = [];
			$scope.$broadcast('resultsCleared');
		}

		if(!$scope.changedPage) {
			$scope.searchMLS();
		} else {
			$scope.changedPage = false;
		}

		$location.search($scope.filters);
	});

	//search MLS
	$scope.searchMLS();

	//label click action
	$('.btn-group').find('label').click(function() {
		if($(this).find('input').is(':checked')) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});
}]);
