angular.module('ihframework')
.directive('ihNearby', function() {
	return {
		scope: {
			classes: "@classes",
			listing: '=',
			config: '='
		},
		template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
		restrict: 'E',
		link: function(scope, elem, attrs) {
			scope.config = attrs.config;
		},
		controller: function($rootScope, $scope, NgMap, $http, userData, ngGPlacesAPI, $timeout) {
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/nearby/template/p1-inhouse.nearby.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/nearby/template/' + $scope.config + '-inhouse.nearby.htm';
				}
			});
			
			$scope.nearbyData = {};
			
			$scope.sources = [
				{
					source: 'school',
					name: 'Schools'
				},
				{
					source: 'shopping_mall',
					name: 'Shopping'
				},
				{
					source: 'restaurant',
					name: 'Dining'
				},
				{
					source: 'night_club',
					name: 'Entertainment'
				},
				{
					source: 'park',
					name: 'Parks',
					radius: 15000
				},
			];

			$scope.$watch('listing', function(newVal) {
				if(newVal !== undefined) {
					if($scope.listing.latlong != undefined) {
						if(typeof $scope.listing.latlong == 'string') {
							$scope.listing.latlong = $scope.listing.latlong.split(',');
						}
						$scope.centerCoordinates = $scope.listing.address + ' ' + $scope.listing.zipcode;
						$scope.loadNearby();
					}
				}
			});
			
			$scope.fetchNearbyData = function(nearby) {
				ngGPlacesAPI.nearbySearch({
					latitude: $scope.listing.latlong[0], 
					longitude: $scope.listing.latlong[1], 
					type: nearby.source,
					radius: nearby.radius || 10000
				}).then((function(nearby) {
					return function(data) {
						var returnData = [];
						for (var i = 0; i < Math.min(data.length, (data.max || 5)); i++) {
							returnData.push({
								name: data[i].name,
								rating: data[i].rating,
								address: data[i].vicinity,
								hours: data[i].opening_hours
							});
						}
						
						for (var i = 0; i < $scope.sources.length; i++) {
							if($scope.sources[i].source == nearby.source) {
								$scope.sources[i].data = returnData;
							}
						}
						if(nearby == $scope.defaultTab) {
							$timeout(function() {
								$scope.selectTab(0);
							});
						}
				  };
				})(nearby));
			};
			
			$scope.loadNearby = function() {
				$scope.defaultTab = $scope.sources[0].source;
				$scope.sources.forEach(function(source) {
					$scope.fetchNearbyData(source);
				});
			};
			
			$scope.selectTab = function(index) {
				if($scope.sources[index].data !== undefined) {
					$scope.markerCoordinates = $scope.sources[index].data.map(function(source) {
						return source.address;
					});
				}
			};
			
			$scope.agent = $rootScope.theUserData;
		}
	};
});
