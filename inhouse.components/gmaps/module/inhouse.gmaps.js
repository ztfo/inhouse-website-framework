angular.module('inhouseApp')
.directive('ihGmaps', function() {
	return {
		template: '<div></div>',
		replace: true,
		restrict: 'E',
		scope: {
			center: '@'
		},
		link: function(scope, element, attrs) {
			scope.$on('listingLoaded', function(event, args) {
				scope.center = {lat: parseFloat(args.latlong.split(',')[0]), lng: parseFloat(args.latlong.split(',')[1])};
				scope.map = new google.maps.Map(element[0], {
					center: scope.center,
					mapTypeId: google.maps.MapTypeId.SATELLITE,
					zoom: 19
				});
				scope.marker = new google.maps.Marker({
					position: scope.center,
					map: scope.map,
					title: args.address
				});
			});
		}
	};
});
