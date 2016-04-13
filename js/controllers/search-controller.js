angular.module('inhouseApp')
.controller('searchController', ['$timeout', '$scope', 'inhouseApi', '$routeParams', '$location', function($timeout, $scope, inhouseApi, $routeParams, $location) {
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
	$scope.searchMLS = function() {
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
				$timeout((function(inhouseApi) {
						return function () {
						$('.ih-like-btn').click(function() {
							data = {};
							data.mls = $(this).attr('data-mls');
							data.address = $(this).attr('data-address');
							if(typeof Storage !== 'undefined') {
								if(typeof localStorage.inhouseAgentUser !== 'undefined') {
									inhouseApi.getData({resource: 'lead-like-listing', mls: data.mls, address: data.address}).success((function(el) {
										return function(response) {
											if(response.code == '200') {
												el.addClass('ih-liked'); //todo: change this to whatever class marks it as liked!
											}
										};
									})($(this)));
								} else {
									//have them register
									$('#accountModal').modal('show');
									$('#accountModal').on('hidden.bs.modal', (function(data, el) {
										return function() {
											if(typeof Storage !== 'undefined' && typeof localStorage.inhouseAgentUser !== 'undefined') {
												inhouseApi.getData({resource: 'lead-like-listing', mls: data.mls, address: data.address}).success(function(response) {
														if(response.code == '200') {
															el.addClass('ih-liked'); //todo: change this to whatever class marks it as liked!
														}
														$('#accountModal').off('hidden.bs.modal');
												});
											}
										};
									})(data, $(this)));
								}
							}
						});
					};
				})(inhouseApi));
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
			$scope.listings = [];
			$scope.$broadcast('resultsCleared');
		}

		$scope.searchMLS();
		$location.search($scope.filters);
		$('#listingDisplay').off('click');
		$('#listingDisplay').click(function() {
			if($(this).attr('data-display-type') == 'list-view') {
				$('.ih-listing-block').removeClass('ih-listview');
				$(this).attr('data-display-type', 'block-view');
				$('[listview]').addClass('hidden');
				$('[blockview]').removeClass('hidden');
			} else {
				$('.ih-listing-block').addClass('ih-listview');
				$(this).attr('data-display-type', 'list-view');
				$('[blockview]').addClass('hidden');
				$('[listview]').removeClass('hidden');
			}
		});
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
