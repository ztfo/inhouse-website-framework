angular.module('ihframework')
.directive('ihListingDetails', [function (inhouseApi, $timeout) {
  return {
    template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
    restrict: 'E',
    replace: true,
    scope: {
      classes: "@classes",
      config: '=',
      listing: '='
    },
    controller: function ($scope) {
      $scope.$watch('config', function(newVal) {
        if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/listing-details/template/' + $scope.config + '-inhouse.listing-details.html';
        } else {
          $scope.templateUrl = 'build/templates/ic/listing-details/template/s1-inhouse.listing-details.html';
        }
      });

      $scope.hideItems = [
        'primaryPhoto',
        'photos',
        'publicRemarks',
        'thumb',
        'latlong',
        'documents',
        'sizeUnit',
        'agentAddress',
        'url',
        'agentId',
      ];

      $scope.showingTab = 0;

      $scope.showTab = function(index) {
        $scope.showingTab = index;
      };

      $scope.show = function(key) {
        return _.indexOf($scope.hideItems, key) == -1;
      };

      $scope.format = {
        address: 'Address',
        beds: 'Beds',
        type: 'Type',
        baths: 'Baths',
        sqft: 'Square Footage',
        city: 'City',
        state: 'State',
        zipcode: 'ZipCode',
        countyOrParish: 'County',
        status: 'Status',
        mls: 'Mls#',
        price: 'Price',
        garage: 'Garage Spaces',
        yearBuilt: 'Year Built',
        stories: 'Stories',
        area: 'Area',
        community: 'Community',
        brokerage: 'Brokerage',
        mlsAssociation: 'MLS Association',
        office: 'List Office',
        agentWebsite: 'List Agent Website',
        agentCity: 'List Agent City',
        agentAssociation: 'Agent Association',
        agentState: 'List Agent State',
        agentName: 'List Agent Name',
        agentPhone: 'List Agent Phone',
        agentEmail: 'List Agent Email',
        lotsize: 'Lot Acres',
        psf: 'Price/SQFT'
      };
    },
  };
}]);
