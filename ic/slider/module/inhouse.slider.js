angular.module('ihframework')
.directive('ihSlider', ['inhouseApi', '$timeout', function(inhouseApi, $timeout) {
	return {
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		replace: true,
		scope: {
			slider: '@',
			classes: '@',
			pull: '@',
			nodefault: '@nodefault'
		},
		controller: function($rootScope, $scope) {
			console.log('rootScope', $rootScope);
			$scope.theUrl = function(config){
				config = 's2';
				return 'build/templates/ic/slider/template/' + config + '-inhouse.slider.htm';
			};

			$scope.active = 0;
			$scope.LandingComponent = $rootScope.theWebsiteData.LandingComponent;
			if(typeof $scope.LandingComponent.defaultSliderImages === 'object') {
				var rIndex = Math.floor(Math.random() * ($scope.LandingComponent.defaultSliderImages.length));
				$scope.LandingComponent.defaultSliderImage = $scope.LandingComponent.defaultSliderImages[rIndex];
			}

			$scope.agent = window.agentSettings;

			$scope.landingLayout = window.storySettings.landingLayout[0];
		},
		link: function(scope, element, attrs) {

			if(scope.pull !== undefined) {
				inhouseApi.getData({resource: 'slider', slider: scope.slider}).success(function(response) {
					scope.slides = response.response.slides;
					$timeout(function() {
						if(typeof scope.nodefault === 'undefined') {
							element.carousel({
								pause: "false",
								interval: 9999
							});
						}
					});
				});
			} else {
				scope.$on('storyLoaded', function(event, args) {
					scope.slides = args[scope.slider].slides;
					$timeout(function() {
						element.carousel({
							pause: "false",
							interval: 9999
						});
					});
				});
			}
			scope.$emit('sliderLoaded', {slider: scope.slider});
		}
	};
}]);
