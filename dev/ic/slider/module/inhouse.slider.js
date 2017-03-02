angular.module('ihframework')
.directive('ihSlider', ['inhouseApi', '$timeout', function(inhouseApi, $timeout) {
	return {
		template: '<ng-include src="templateUrl"><ng-include>',
		restrict: 'E',
		replace: true,
		scope: {
			slider: '=',
			classes: '@',
			pull: '@',
			nodefault: '@nodefault',
			config: '=',
			listing: '=',
			savedslides: '=',
			data: '=',
		},
		controller: function($rootScope, $scope, userDataService, $element, $timeout) {
			//$scope.config = userDataService.sliderConfig;
			$scope.myInterval = 2000;
			$scope.active = 0;

			$scope.$watch('slides', function(newVal) {
				if(newVal !== undefined) {
					$scope.slides = newVal;
				}
			});
			$scope.$watch('data', function(newVal) {
				if(newVal !== undefined) {
					$scope.data = newVal;
				}
			});
			$scope.$watch('config', function(newVal) {
				if (newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/slider/template/' + $scope.config + '-inhouse.slider.html';
				} else {
					$scope.templateUrl = 'build/templates/ic/slider/template/s1-inhouse.slider.html';
				}
			});

			$scope.$watch('listing', function(newVal) {
				if (newVal !== undefined && ($scope.slides == undefined || $scope.slides.length == 0)) {
					$scope.slides = newVal.Details.photos;
				}
			});

			$scope.$watch('savedslides', function(newVal) {
				if (newVal !== undefined && newVal.length > 0) {
					$scope.slides = newVal;
				}
			}, true);

			$scope.LandingComponent = $rootScope.theWebsiteData.LandingComponent;

			if (typeof $scope.LandingComponent !== 'undefined') {
				if (typeof $scope.LandingComponent.defaultSliderImages === 'object') {
					var rIndex = Math.floor(Math.random() * ($scope.LandingComponent.defaultSliderImages.length));
					$scope.LandingComponent.defaultSliderImage = $scope.LandingComponent.defaultSliderImages[rIndex];
				} else {
					$scope.slides = [$scope.LandingComponent.defaultSliderImage];
				}
			}
			$scope.agent = $rootScope.theUserData;
		},
		link: function(scope, element, attrs) {

			if(scope.data == undefined) scope.data = {};
			if((scope.data.slides == undefined || scope.data.slides.length == 0) && scope.data.filters != undefined) {
				inhouseApi.newApi.getSliderImages(scope.data.filters).success(function(response) {
					scope.slides = response.data.images;
				});
			}
			scope.$emit('sliderLoaded', {
				slider: scope.slider
			});
		}
	};
}]);
