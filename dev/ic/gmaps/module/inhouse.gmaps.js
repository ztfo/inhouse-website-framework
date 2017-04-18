angular.module('ihframework')
.directive('ihGmaps', function() {
  return {
    template: '<div></div>',
    replace: true,
    restrict: 'E',
    scope: {
      center: '@',
      classes: '@',
      listing: '='
    },
    controller: ['$scope', '$element', function($scope, $element) {
      $scope.$watch('listing.details', function(newVal) {
        if(newVal) {
          $scope.prepareMap();
        }
      });

      $scope.prepareMap = function() {
        if($scope.listing.latlong) {
          $scope.placeMarker($scope.listing.latlong);
          return;
        }

        $scope.geocodeAddress(listing);
      };

      $scope.placeMarker = function(latlong) {
        $scope.center = {lat: parseFloat(latlong.split(',')[0]), lng: parseFloat(latlong.split(',')[1])};

        $scope.map = new google.maps.Map($element[0], {
          center: $scope.center,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          crollwheel: false,
          zoom: 19
        });

        $scope.marker = new google.maps.Marker({
          position: $scope.center,
          title: $scope.listing.address,
          map: $scope.map,
          icon: 'https://s3-us-west-2.amazonaws.com/inhouse-websites/ia/icons/map-pin.png'
        });
      };

      $scope.geocodeAddress = function(listing) {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( { 'address': listing.address + ' ' + listing.zipcode}, function(results, status) {
          if (status != google.maps.GeocoderStatus.OK) {
            return;
          }

          var location = _.get(results, '[0].geometry.location');

          $scope.placeMarker(location);
        });
      };

    }]
  };
});
