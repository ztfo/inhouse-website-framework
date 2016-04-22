angular.module('inhouseApp')
.controller('searchController', ['$timeout', '$scope', 'inhouseApi', '$routeParams', '$location', function($timeout, $scope, inhouseApi, $routeParams, $location) {
	$scope.searchCount = 0;
	if(typeof Storage !== 'undefined') {
		if(typeof localStorage.inhouseSearchCount !== 'undefined') {
			$scope.searchCount = localStorage.inhouseSearchCount;
		}
	}
	$scope.getGets = function() {
		var gets = {};
		for (var property in $routeParams) {
			if($routeParams.hasOwnProperty(property)) {
				gets[property] = $routeParams[property];
			}
		}
		$scope.filters = gets;
	};
	$scope.noWipe = false;
	$scope.firstLoad = true;

	$scope.focusListing = function(listing) {
		$scope.$broadcast('focusListing', listing);
	};
	$scope.blurListing = function(listing) {
		$scope.$broadcast('blurListing', listing);
	};
	$scope.moreListings = function() {
		$scope.noWipe = true;
		if(typeof $scope.filters.page === 'undefined') {
			$scope.filters.page = 2;
		} else {
			$scope.filters.page ++;
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
	$scope.searchMLS = function() {
		$scope.firstLoad = false;
		$scope.searchCount ++;

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
				}
			}
		}

		if(Object.keys($scope.filters).length > 0) {

			$scope.listingLoaders = 15;
			var params = $scope.filters;

			inhouseApi.getData({resource: 'search-mls', params: params}).success(function(response) {
				if(typeof response.response != 'undefined' && response.response.length > 0) {
					$scope.totalListings = response.response[0].total_results;
					$scope.displayListings = response.response.length;
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

	$scope.getGets();

	$scope.removeFilter = function(filter) {
		if(typeof $scope.filters[filter] != 'undefined') {
			delete $scope.filters[filter];
		}
	};
	$scope.loadingListings = function() {

	}
	$scope.$on('$locationChangeSuccess', function(event, oldUrl, newUrl) {
		$scope.getGets();
	});
	$scope.$watchCollection('filters', function(newFilters, oldFilters) {
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

	$scope.searchMLS();
	$('.btn-group').find('label').click(function() {
		if($(this).find('input').is(':checked')) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});
}]);
