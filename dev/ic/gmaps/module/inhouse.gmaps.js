angular.module('ihframework')
.directive('ihGmaps', function() {
	return {
		template: '<div></div>',
		replace: true,
		restrict: 'E',
		scope: {
			center: '@',
			classes: '@'
		},
		link: function(scope, element, attrs) {
			scope.$on('listingLoaded', function(event, args) {
				if(typeof args.Details.latlong === 'undefined') {
					var geocoder = new google.maps.Geocoder();
					geocoder.geocode( { 'address': args.Details.address + ' ' + (args.Details.zipcode !== undefined ? args.Details.zipcode : '')}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							scope.center = results[0].geometry.location;
							scope.map = new google.maps.Map(element[0], {
								center: scope.center,
								mapTypeId: google.maps.MapTypeId.HYBRID,
								crollwheel: false,
								zoom: 18
							});
							scope.marker = new google.maps.Marker({
								position: scope.center,
								map: scope.map,
								title: args.Details.address,
								icon: 'https://s3-us-west-2.amazonaws.com/inhouse-websites/ia/icons/map-pin.png'
							});
						}
					});

				} else {
					scope.center = {lat: parseFloat(args.Details.latlong.split(',')[0]), lng: parseFloat(args.Details.latlong.split(',')[1])};
					scope.map = new google.maps.Map(element[0], {
						center: scope.center,
						mapTypeId: google.maps.MapTypeId.SATELLITE,
						crollwheel: false,
						zoom: 19
					});
					scope.marker = new google.maps.Marker({
						position: scope.center,
						title: args.Details.address,
						map: scope.map,
						icon: 'https://s3-us-west-2.amazonaws.com/inhouse-websites/ia/icons/map-pin.png'
					});
				}
			});
		}
	};
});
