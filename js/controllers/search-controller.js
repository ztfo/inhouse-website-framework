angular.module('inhouseApp')
.controller('searchController', ['$scope', 'inhouseApi', '$routeParams', '$location', function($scope, inhouseApi, $routeParams, $location) {
	$scope.getGets = function() {
		var gets = {};
		for (var property in $routeParams) {
			if($routeParams.hasOwnProperty(property)) {
				gets[property] = $routeParams[property];
			}
		}
		if(typeof gets.page == 'undefined') {
			gets.page = 1;
		}
		if(typeof gets.active == 'undefined') {
			gets.active = true;
		}
		$scope.filters = gets;
	};
	$scope.moreListings = function() {
		$scope.filters.page ++;
		$scope.noWipe = true;
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
			inhouseApi.getData({resource: 'search-mls', params: $scope.filters}).success(function(response) {
				if(typeof response.response != 'undefined' && response.response.length > 0) {
					$scope.totalListings = response.response[0].total_results;
					$scope.displayListings = response.response.length;
				} else {
					$scope.totalListings = 0;
					$scope.displayListings = 0;
				}

				$scope.listingLoaders = 0;
				if(typeof $scope.listings == 'undefined') {
					$scope.listings = [];
				}
				for (var i = 0; i < response.response.length; i++) {
					$scope.listings.push(response.response[i]);
				}
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
	$scope.$watchCollection('filters', function(newFilters, oldFilters) {
		$location.search($scope.filters);
		if(!$scope.noWipe) {
			$scope.listings = [];
			$scope.filters.page = 1;
		}

		$scope.noWipe = false;
		$scope.searchMLS();
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

	$('.btn-group').find('label').click(function() {
		if($(this).find('input').is(':checked')) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});
}]);
