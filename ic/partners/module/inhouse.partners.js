angular.module('inhouseApp')
.directive('ihPartners', ['$window', '$timeout', function ($window, $timeout) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/partners/template/' + (attrs.config || 's1') + '-inhouse.partners.htm';
		},
		restrict: 'E',
		replace: true,
		scope: {
			classes: "@classes"
		},
		link: function (scope, element, attrs) {
			scope.partners = $window.storySettings.partners;

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
