angular.module('ihframework')
.directive('ihPartners', ['$window', '$timeout', function ($window, $timeout) {
	return {
		template: '<ng-include src="theUrl()"><ng-include>',
		restrict: 'E',
		replace: true,
		scope: {
			classes: "@classes"
		},
		controller: function($rootScope, $scope){
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/partners/template/' + config + '-inhouse.partners.htm';
			};
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
