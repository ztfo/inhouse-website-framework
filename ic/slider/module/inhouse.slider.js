angular.module('inhouseApp')
.directive('ihSlider', ['inhouseApi', function(inhouseApi) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/slider/template/' + (attrs.config || 's1') + '-inhouse.slider.htm';
		},
		restrict: 'E',
		replace: true,
		scope: {
			slider: '@',
			classes: '@',
			pull: '@',
			nodefault: '@nodefault'
		},
		controller: function($scope) {
			$scope.LandingComponent = window.storySettings.LandingComponent;
			$scope.agent = window.agentSettings;
		},
		link: function(scope, element, attrs) {
			if(scope.pull !== undefined) {
				inhouseApi.getData({resource: 'slider', slider: scope.slider}).success(function(response) {
					scope.slides = response.response.slides;
					element.carousel({
						pause: "false",
						interval: 25000
					});
				});
			} else {
				scope.$on('storyLoaded', function(event, args) {
					scope.slides = args[scope.slider].slides;
					element.carousel({
						pause: "false",
						interval: 25000
					});
				});
			}
		}
	};
}]);
