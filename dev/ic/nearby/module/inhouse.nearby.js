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
		link: function(scope, elem, attrs){
			scope.config = attrs.config;
		},
		controller: function($rootScope, $scope, NgMap, $http, userData, ngGPlacesAPI) {

			// console.log('listing', $scope.listing);

			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/nearby/template/p1-inhouse.nearby.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/nearby/template/' + $scope.config + '-inhouse.nearby.htm';
				}
			});

			ngGPlacesAPI.nearbySearch({latitude:32.2216667, longitude:-110.9258333, type: 'school'}).then(function(schools){
				$scope.schoolData = [];
				for(var i = 0; i < 5; i++){
					var x = {};
					x.name = schools[i].name;
					x.rating = schools[i].rating;
					x.address = schools[i].vicinity;
					$scope.schoolData.push(x);
				}
				$scope.markerCoordinates1 = $scope.schoolData[0].address;
				$scope.markerCoordinates2 = $scope.schoolData[1].address;
				$scope.markerCoordinates3 = $scope.schoolData[2].address;
				$scope.markerCoordinates4 = $scope.schoolData[3].address;
				$scope.markerCoordinates5 = $scope.schoolData[4].address;
		  });

			ngGPlacesAPI.nearbySearch({latitude:32.2216667, longitude:-110.9258333, type: 'shopping_mall'}).then(function(shopping){
				$scope.shoppingData = [];
				for(var i = 0; i < 5; i++){
					var x = {};
					x.name = shopping[i].name;
					x.rating = shopping[i].rating;
					x.address = shopping[i].vicinity;
					$scope.shoppingData.push(x);
				}
				$scope.markerCoordinates1 = $scope.shoppingData[0].address;
				$scope.markerCoordinates2 = $scope.shoppingData[1].address;
				$scope.markerCoordinates3 = $scope.shoppingData[2].address;
				$scope.markerCoordinates4 = $scope.shoppingData[3].address;
				$scope.markerCoordinates5 = $scope.shoppingData[4].address;
		  });

			ngGPlacesAPI.nearbySearch({latitude:32.2216667, longitude:-110.9258333, type: 'restaurant'}).then(function(food){
				$scope.foodData = [];
				for(var i = 0; i < 5; i++){
					var x = {};
					x.name = food[i].name;
					x.rating = food[i].rating;
					x.address = food[i].vicinity;
					$scope.foodData.push(x);
				}
				$scope.markerCoordinates1 = $scope.foodData[0].address;
				$scope.markerCoordinates2 = $scope.foodData[1].address;
				$scope.markerCoordinates3 = $scope.foodData[2].address;
				$scope.markerCoordinates4 = $scope.foodData[3].address;
				$scope.markerCoordinates5 = $scope.foodData[4].address;
		  });

			ngGPlacesAPI.nearbySearch({latitude:32.2216667, longitude:-110.9258333, type: 'night_club'}).then(function(fun){
				$scope.funData = [];
				for(var i = 0; i < 5; i++){
					var x = {};
					x.name = fun[i].name;
					x.rating = fun[i].rating;
					x.address = fun[i].vicinity;
					$scope.funData.push(x);
				}
				$scope.markerCoordinates1 = $scope.funData[0].address;
				$scope.markerCoordinates2 = $scope.funData[1].address;
				$scope.markerCoordinates3 = $scope.funData[2].address;
				$scope.markerCoordinates4 = $scope.funData[3].address;
				$scope.markerCoordinates5 = $scope.funData[4].address;
		  });

			ngGPlacesAPI.nearbySearch({latitude:32.2216667, longitude:-110.9258333, type: 'park'}).then(function(parks){
				$scope.parksData = [];
				for(var i = 0; i < 5; i++){
					var x = {};
					x.name = parks[i].name;
					x.rating = parks[i].rating;
					x.address = parks[i].vicinity;
					$scope.parksData.push(x);
				}
				$scope.markerCoordinates1 = $scope.parksData[0].address;
				$scope.markerCoordinates2 = $scope.parksData[1].address;
				$scope.markerCoordinates3 = $scope.parksData[2].address;
				$scope.markerCoordinates4 = $scope.parksData[3].address;
				$scope.markerCoordinates5 = $scope.parksData[4].address;
		  });


			// Default coordinates on page load
			$scope.centerCoordinates = "Tucson, AZ";

			$scope.selectSchoolsTab = function(e) {
				$scope.markerCoordinates1 = $scope.schoolData[0].address;
				$scope.markerCoordinates2 = $scope.schoolData[1].address;
				$scope.markerCoordinates3 = $scope.schoolData[2].address;
				$scope.markerCoordinates4 = $scope.schoolData[3].address;
				$scope.markerCoordinates5 = $scope.schoolData[4].address;
				$scope.apply();
			};
			$scope.selectShoppingTab = function(e) {
				$scope.markerCoordinates1 = $scope.shoppingData[0].address;
				$scope.markerCoordinates2 = $scope.shoppingData[1].address;
				$scope.markerCoordinates3 = $scope.shoppingData[2].address;
				$scope.markerCoordinates4 = $scope.shoppingData[3].address;
				$scope.markerCoordinates5 = $scope.shoppingData[4].address;
			};
			$scope.selectFoodTab = function(e) {
				$scope.markerCoordinates1 = $scope.foodData[0].address;
				$scope.markerCoordinates2 = $scope.foodData[1].address;
				$scope.markerCoordinates3 = $scope.foodData[2].address;
				$scope.markerCoordinates4 = $scope.foodData[3].address;
				$scope.markerCoordinates5 = $scope.foodData[4].address;
			};
			$scope.selectFunTab = function(e) {
				$scope.markerCoordinates1 = $scope.funData[0].address;
				$scope.markerCoordinates2 = $scope.funData[1].address;
				$scope.markerCoordinates3 = $scope.funData[2].address;
				$scope.markerCoordinates4 = $scope.funData[3].address;
				$scope.markerCoordinates5 = $scope.funData[4].address;
			};
			$scope.selectParksTab = function(e) {
				$scope.markerCoordinates1 = $scope.parksData[0].address;
				$scope.markerCoordinates2 = $scope.parksData[1].address;
				$scope.markerCoordinates3 = $scope.parksData[2].address;
				$scope.markerCoordinates4 = $scope.parksData[3].address;
				$scope.markerCoordinates5 = $scope.parksData[4].address;
			};

			$scope.agent = $rootScope.theUserData;
		}
	};
});
