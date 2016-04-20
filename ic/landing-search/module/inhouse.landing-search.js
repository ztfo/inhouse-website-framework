angular.module('inhouseApp')
.directive('ihLandingSearch', ['$location', function($location) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/landing-search/template/' + (attrs.config || 's1') + '-inhouse.landing-search.htm';
		},
		restrict: 'E',
		replace: true,
		scope: {
			classes: "@classes"
		},
		controller: function($scope) {
			$scope.agent = window.agentSettings;
			$scope.filters = {};
			$scope.toggleButton = function($event, val) {
				if(!$($event.target).hasClass('active')) {
					this.filters[val] = true;
				} else {
					if(typeof this.filters[val] != 'undefined') {
						delete this.filters[val];
					}
				}
			};
			$scope.searchMLS = function() {
				
				if(typeof this.filters != 'undefined') {
					this.filters.active = true;
				}
				//price filter split
				if(typeof this.filters['price_from'] !== 'undefined') {
					this.filters.price = this.filters['price_from'] + ',';
				}
				if(typeof this.filters['price_to'] !== 'undefined') {
					if(typeof this.filters.price == 'undefined') {
						this.filters.price = "0,";
					}
					this.filters.price += this.filters['price_to'];
				}

				//beds filter split
				if(typeof this.filters['min_beds'] !== 'undefined') {
					this.filters.bedsRange = this.filters['min_beds'] + ',';
				}
				if(typeof this.filters['max_beds'] !== 'undefined') {
					if(typeof this.filters.bedsRange == 'undefined') {
						this.filters.bedsRange = "0,";
					}
					this.filters.bedsRange += this.filters['max_beds'];
				}
				delete this.filters.max_beds;
				delete this.filters.min_beds;

				//sqft filter split
				if(typeof this.filters['min_sqft'] !== 'undefined') {
					this.filters.sqft = this.filters['min_sqft'] + ',';
				}
				if(typeof this.filters['max_sqft'] !== 'undefined') {
					if(typeof this.filters.sqft == 'undefined') {
						this.filters.sqft = "0,";
					}
					this.filters.sqft += this.filters['max_sqft'];
				}
				delete this.filters.max_sqft;
				delete this.filters.min_sqft;

				//acres filter split
				if(typeof this.filters['min_acres'] !== 'undefined') {
					this.filters.lotsizeRange = this.filters['min_acres'] + ',';
				}
				delete this.filters.min_acres;

				$location.path('search-mls').search(this.filters);
			};
		},
		link: function(scope, element, attrs) {
			scope.$on('storyLoaded', function(event, args) {
				scope.LandingSearch = args['LandingSearch'];
			});
		}
	};
}]);
