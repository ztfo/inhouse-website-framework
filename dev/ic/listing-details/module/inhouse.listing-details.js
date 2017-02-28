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
				agentName: 'List Agent Name',
				agentPhone: 'List Agent Phone',
				agentEmail: 'List Agent Email',
				lotsize: 'Lot Acres',
				psf: 'Price/SQFT'
			};
		},
		link: function (scope, element, attrs) {
			scope.$on('listingLoaded', function (event, args) {
				scope.listing = args;
				if(scope.listing.showOldTable == true) {
					scope.config = 's2';
				}
			});
		}
	};
}]);
