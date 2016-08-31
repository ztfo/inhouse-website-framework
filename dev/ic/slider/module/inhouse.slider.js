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
			listing: '='
		},
		controller: function($rootScope, $scope, userDataService, $element) {
			//$scope.config = userDataService.sliderConfig;
			
			$scope.$watch('config', function(newVal) {
				console.log('slider config: ' + newVal);
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/slider/template/' + $scope.config + '-inhouse.slider.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/slider/template/s1-inhouse.slider.htm';
				}
			});
			
			$scope.$watch('listing', function(newVal) {
				if(newVal !== undefined) {
					$scope.slides = newVal.photos;
				}
			});

			$scope.active = 0;
			$scope.LandingComponent = $rootScope.theWebsiteData.LandingComponent;
			if(typeof $scope.LandingComponent.defaultSliderImages === 'object') {
				var rIndex = Math.floor(Math.random() * ($scope.LandingComponent.defaultSliderImages.length));
				$scope.LandingComponent.defaultSliderImage = $scope.LandingComponent.defaultSliderImages[rIndex];
			}

			$scope.agent = $rootScope.theUserData;

			$scope.landingLayout = $rootScope.theWebsiteData.landingLayout[0];
		},
		link: function(scope, element, attrs) {

			if(scope.pull !== undefined) {
				inhouseApi.getData({resource: 'slider', slider: scope.slider}).success(function(response) {
					scope.slides = response.response.slides;
				});
			} else {
				scope.$on('storyLoaded', function(event, args) {
					scope.slides = args[scope.slider].slides;
				});
			}
			scope.$emit('sliderLoaded', {slider: scope.slider});
		}
	};
}]);
