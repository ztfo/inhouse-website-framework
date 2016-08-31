angular.module('ihframework')
.directive('ihPartners', ['$window', '$timeout', function ($window, $timeout) {
	return {
		template: '<ng-include src="templateUrl"><ng-include>',
		restrict: 'E',
		replace: true,
		scope: {
			classes: "@class",
			config: '='
		},
		controller: function($rootScope, $scope){
			$scope.$watch('config', function(newVal) {
				if(newVal !== undefined) {
					$scope.templateUrl = 'build/templates/ic/partners/template/' + $scope.config + '-inhouse.partners.htm';
				} else {
					$scope.templateUrl = 'build/templates/ic/partners/template/s1-inhouse.partners.htm';
				}
			});
			
			$scope.partners = $rootScope.theWebsiteData.partners;
		},
		link: function (scope, element, attrs) {

			$timeout(function () {
				element.find(".owl-carousel.partner-carousel").owlCarousel({
					loop: true,
					margin: 15,
					nav: false,
					responsive: {
						0: {
							items: 1
						},
						600: {
							items: 3
						},
						1000: {
							items: 5
						}
					}
				});
			});
		}
	};
}]);
