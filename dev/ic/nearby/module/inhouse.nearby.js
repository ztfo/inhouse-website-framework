angular.module('ihframework')
.directive('ihNearby', function() {
	return {
		scope: {
			classes: "@classes",
			listing: '=',
			config: '=',
			sources: '='
		},
		template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
		restrict: 'E',
		controller: function($rootScope, $scope, NgMap, $http, userData, ngGPlacesAPI, $timeout) {
			$scope.$watch('config', function(newVal) {
				if(newVal == undefined) {
					$scope.templateUrl = 'build/templates/ic/nearby/template/p1-inhouse.nearby.html';
				} else {
					$scope.templateUrl = 'build/templates/ic/nearby/template/' + $scope.config + '-inhouse.nearby.html';
				}
			});

			$scope.nearbyData = {};

			if($scope.sources == undefined) {
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
			}

			$scope.$watch('sources', function(newVal) {
				if(newVal !== undefined) {
					$scope.sources = newVal;
				}
			});

			if($scope.sources.length > 0) {
				$scope.defaultTab = $scope.sources[0];
			}



			$scope.$watch('listing', function(newVal) {
				if(newVal !== undefined) {
					if($scope.listing.Details.latlong != undefined) {
						if(typeof $scope.listing.Details.latlong == 'string') {
							$scope.listing.Details.latlong = $scope.listing.Details.latlong.split(',');
						}
						$scope.centerCoordinates = $scope.listing.Details.address + ' ' + $scope.listing.Details.zipcode;
						if(typeof $scope.sources !== 'undefined' && $scope.sources.length > 0) {
							$scope.loadNearby();
						}
					}
				}
			});

			$scope.fetchNearbyData = function(nearby) {
				ngGPlacesAPI.nearbySearch({
					latitude: $scope.listing.Details.latlong[0],
					longitude: $scope.listing.Details.latlong[1],
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
				$scope.sources.forEach(function(source) {
					$scope.fetchNearbyData(source);
				});
			};

			$scope.selectTab = function(index) {
				$scope.showTab = $scope.sources[index].source;
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
