angular.module('ihframework')
.directive('ihListingMap', ['$filter', '$interpolate', '$templateCache', '$http', function($filter, $interpolate, $templateCache, $http) {
	return {
		template: '<div></div>',
		replace: true,
		restrict: 'E',
		scope: {
			center: '@'
		},
		link: function(scope, element, attrs) {
			scope.map = new google.maps.Map(element[0], {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				zoom: 19
			});
			scope.bounds = new google.maps.LatLngBounds();
			scope.markers = [];

			scope.pF = $filter('currency');

			$http.get('ic/listing-map/template/inhouse.gmap-popup.htm').then(function(response) {
				scope.contentTemplate = response.data;
			});

			scope.$on('refreshMap', function(event, args) {
				google.maps.event.trigger(scope.map, 'resize');
				scope.map.fitBounds(scope.bounds);
			});
			scope.$on('resultsCleared', function(event, args) {
				for (var i = 0; i < scope.markers.length; i++) {
					scope.markers[i].setMap(null);
				}
			});
			scope.$on('focusListing', function(event, args) {
				scope = event.currentScope;
				for (var i = 0; i < scope.infoWinds.length; i++) {
					scope.infoWinds[i].close();
				}
				scope.infoWinds[args].open(scope.map, scope.markers[args]);
			});
			scope.$on('blurListing', function(event, args) {
				scope = event.currentScope;
				scope.infoWinds[args].close();
			});
			scope.$on('resultsLoaded', function(event, args) {
				var bounds = new google.maps.LatLngBounds();
				scope = event.currentScope;
				//wipe markers
				for (var i = 0; i < scope.markers.length; i++) {
					scope.markers[i].setMap(null);
				}
				scope.markers = [];
				scope.infoWinds = [];

				//set new markers
				for (var i = 0; i < args.length; i++) {
					scope.listing = args[i];
					var info = new google.maps.InfoWindow({
						content: $interpolate(scope.contentTemplate)(scope)
					});
					scope.infoWinds.push(info);
					var marker = new google.maps.Marker({
						position: {lat: parseFloat(args[i].latlong.split(',')[0]), lng: parseFloat(args[i].latlong.split(',')[1])},
						map: scope.map,
						title: args[i].address,
						icon: 'ia/icons/map-pin.png'
					});
					marker.addListener('click', (function(map, marker, infoWindow) {
						return function() {
							infoWindow.open(map, marker);
						};
					})(scope.map, marker, info));

					scope.markers.push(marker);
					bounds.extend(scope.markers[i].position);
				}
				scope.bounds = bounds;
				scope.map.fitBounds(scope.bounds);
			});
		},
	};
}]);
