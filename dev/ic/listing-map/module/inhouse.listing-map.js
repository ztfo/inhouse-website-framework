angular.module('ihframework')
.directive('ihListingMap', ['$filter', '$interpolate', '$templateCache', '$http', function($filter, $interpolate, $templateCache, $http) {
  return {
    template: '<div></div>',
    replace: true,
    restrict: 'E',
    scope: {
      center: '@',
      results: '='
    },
    controller: ['$scope', '$element', function(scope, element) {
      scope.map = new google.maps.Map(element[0], {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 19
      });

      scope.bounds = new google.maps.LatLngBounds();

      scope.markers = [];
      scope.infoWinds = [];

      scope.pF = $filter('currency');

      scope.contentTemplate = $templateCache.get('build/templates/ic/listing-map/template/inhouse.gmap-popup.html');

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
        _.map(scope.infoWinds, function(infoWind) {
          infoWind.close();
        });

        scope.infoWinds[args].open(scope.map, scope.markers[args]);
      });

      scope.$on('blurListing', function(event, args) {
        scope.infoWinds[args].close();
      });

      scope.$watch('results', function(newVal) {
        if(!newVal) return;

        var bounds = new google.maps.LatLngBounds();
        //wipe markers
        _.map(scope.markers, function(marker) {
          marker.setMap(null);
        });

        scope.markers = [];
        scope.infoWinds = [];

        //set new markers
        _.map(newVal, function(result) {
          scope.listing = result;

          var info = new google.maps.InfoWindow({
            content: $interpolate(scope.contentTemplate)(scope)
          });

          scope.infoWinds.push(info);
          var marker = new google.maps.Marker({
            position: {lat: parseFloat(result.latlong.split(',')[0]), lng: parseFloat(result.latlong.split(',')[1])},
            map: scope.map,
            title: result.address,
            icon: 'https://s3-us-west-2.amazonaws.com/inhouse-websites/ia/icons/map-pin.png'
          });

          marker.addListener('click', (function(map, marker, infoWindow) {
            return function() {
              infoWindow.open(map, marker);
            };
          })(scope.map, marker, info));

          scope.markers.push(marker);
          bounds.extend(marker.position);
        });

        scope.bounds = bounds;
        scope.map.fitBounds(scope.bounds);
      });
    }]
  };
}]);
