angular.module('ihframework')
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

	if(typeof $rootScope.theWebsiteData.resultsConfig !== 'undefined' && $rootScope.theWebsiteData.resultsConfig === 's2') {
		$rootScope.$broadcast('hideFooter');
		$scope.$on('$destroy', function() {
			$rootScope.$broadcast('showFooter');
		});
	}

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

	$scope.searchTab = 'find';

	$scope.toggleSearchTabs = function(tab){
		$scope.searchTab = tab;
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
			if(typeof localStorage.inhouseAgentLead === 'undefined') {
				if(localStorage.inhouseSearchCount == 0 && localStorage.inhouseSearchFreebies == 'false') {
					$scope.searchCount = 1;
					localStorage.inhouseSearchCount = 1;
				} else {
					localStorage.inhouseSearchCount = $scope.searchCount;
				}
				var max = $rootScope.theWebsiteData.maxSearchNoLead || 3;
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
					if($rootScope.theWebsiteData.disableLeadSignup !== true) {
						$scope.searchCount ++;
					}
				}
			}
		}

		if(Object.keys($scope.filters).length > 0) {

			$scope.listingLoaders = 15;
			var params = $scope.filters;

			inhouseApi.newApi.searchMls(params).success(function(response) {
				if(response.listings == undefined && response.data !== undefined && response.data.listings !== undefined) {
					response = {listings: response.data.listings, pagination: response.data.pagination};
				}
				if(typeof response.listings != 'undefined' && response.listings.length > 0) {
					$scope.totalListings = response.pagination.last_count;
					if(response.pagination.page_size == 15) {
						$scope.displayListings = response.pagination.page_size * ($scope.filters.page || 1);
					} else {
						$scope.displayListings = response.pagination.last_count;
					}
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

				for (var i = 0; i < response.listings.length; i++) {
					$scope.listings.push(response.listings[i]);
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



            //price clear both
            if (typeof this.filters.price_from !== 'undefined' && this.filters.price_from.length == 0 && 
            	typeof this.filters.price_to !== 'undefined' && this.filters.price_to.length == 0) {
            	delete this.filters.price_from;
            	delete this.filters.price_to;
            	delete this.filters.price;
            }
            //price clear from
            if (typeof this.filters.price_from !== 'undefined' && this.filters.price_from.length == 0 &&
            	typeof this.filters.price_to == 'undefined') {
            	delete this.filters.price_from;
            	delete this.filters.price;
            }
            //price clear to
            if (typeof this.filters.price_to !== 'undefined' && this.filters.price_to.length == 0 &&
            	typeof this.filters.price_from == 'undefined') {
            	delete this.filters.price_to;
            	delete this.filters.price;
            }
            //price filter split
            if (typeof this.filters.price_from !== 'undefined') {
                this.filters.price = this.filters.price_from + ';';
            }
            if (typeof this.filters.price_to !== 'undefined') {
                if (typeof this.filters.price_from == 'undefined') {
                    this.filters.price = "0;" + this.filters.price_to;
                }
                else {
                	this.filters.price = this.filters.price_from + ';' + this.filters.price_to;
                }
            }

            //beds clear both
            if (typeof this.filters.min_beds !== 'undefined' && this.filters.min_beds.length == 0 && 
            	typeof this.filters.max_beds !== 'undefined' && this.filters.max_beds.length == 0) {
            	delete this.filters.min_beds;
            	delete this.filters.max_beds;
            	delete this.filters.bedsRange
            }
            //beds clear min
            if (typeof this.filters.min_beds !== 'undefined' && this.filters.min_beds.length == 0 &&
            	typeof this.filters.max_beds == 'undefined') {
            	delete this.filters.min_beds;
            	delete this.filters.bedsRange;
            }
            //beds clear max
            if (typeof this.filters.max_beds !== 'undefined' && this.filters.max_beds.length == 0 &&
            	typeof this.filters.min_beds == 'undefined') {
            	delete this.filters.max_beds;
            	delete this.filters.bedsRange;
            }
            //beds filter split
            if (typeof this.filters.min_beds !== 'undefined') {
                this.filters.bedsRange = this.filters.min_beds + ';';
            }
            if (typeof this.filters.max_beds !== 'undefined') {
                if (typeof this.filters.min_beds == 'undefined') {
                    this.filters.bedsRange = "0;" + this.filters.max_beds;
                }
                else {
	                this.filters.bedsRange = this.filters.min_beds + ';' + this.filters.max_beds;
                }
            }

            //baths clear both
            if (typeof this.filters.min_baths !== 'undefined' && this.filters.min_baths.length == 0 && 
            	typeof this.filters.max_baths !== 'undefined' && this.filters.max_baths.length == 0) {
            	delete this.filters.min_baths;
            	delete this.filters.max_baths;
            	delete this.filters.bathsRange;
            }
            //baths clear min
            if (typeof this.filters.min_baths !== 'undefined' && this.filters.min_baths.length == 0 &&
            	typeof this.filters.max_baths == 'undefined') {
            	delete this.filters.min_baths;
            	delete this.filters.bathsRange;
            }
            //baths clear max
            if (typeof this.filters.max_baths !== 'undefined' && this.filters.max_baths.length == 0 &&
            	typeof this.filters.min_baths == 'undefined') {
            	delete this.filters.max_baths;
            	delete this.filters.bathsRange;
           	}
             //baths filter split
            if (typeof this.filters.min_baths !== 'undefined') {
                this.filters.bathsRange = this.filters.min_baths + ';';
            }
            if (typeof this.filters.max_baths !== 'undefined') {
                if (typeof this.filters.min_baths == 'undefined') {
                    this.filters.bathsRange = "0;" + this.filters.max_baths;
                }
                else {
	                this.filters.bathsRange = this.filters.min_baths + ';' + this.filters.max_baths;
                }
            }

            //sqft clear both
            if (typeof this.filters.min_sqft !== 'undefined' && this.filters.min_sqft.length == 0 && 
            	typeof this.filters.max_sqft !== 'undefined' && this.filters.max_sqft.length == 0) {
            	delete this.filters.min_sqft;
            	delete this.filters.max_sqft;
            	delete this.filters.sqft;
            }
            //sqft clear min
            if (typeof this.filters.min_sqft !== 'undefined' && this.filters.min_sqft.length == 0 &&
            	typeof this.filters.max_sqft == 'undefined') {
            	delete this.filters.min_sqft;
            	delete this.filters.sqft;
           	}
            //sqft clear max
            if (typeof this.filters.max_sqft !== 'undefined' && this.filters.max_sqft.length == 0 &&
            	typeof this.filters.min_sqft == 'undefined') {
            	delete this.filters.max_sqft;
            	delete this.filters.sqft;            	
            }
            //sqft filter split
            if (typeof this.filters.min_sqft !== 'undefined') {
                this.filters.sqft = this.filters.min_sqft + ';';
            }
            if (typeof this.filters.max_sqft !== 'undefined') {
                if (typeof this.filters.min_sqft == 'undefined') {
                    this.filters.sqft = "0;" + this.filters.max_sqft;
                }
                else {
	                this.filters.sqft = this.filters.min_sqft + ';' + this.filters.max_sqft;
                }
            }

            $location.path('search-mls').search(this.filters);
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
	$scope.$watchCollection('filters', _.debounce(function(newFilters, oldFilters) {
		if(newFilters == oldFilters) {
			return;
		}
		$scope.$apply(function() {
			$scope.$broadcast('filtersChanged', $scope.filters);
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
	}, 800));

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
