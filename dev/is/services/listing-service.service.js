angular.module('ihframework').service('listingService', function($http, $q){
  var selectedListing = {};

  var assignSelectedListing = function(listing){
    selectedListing = listing
  };

  var getSelectedListing = function(){
    return selectedListing;
  };

  return {
    assignSelectedListing: assignSelectedListing,
    getSelectedListing: getSelectedListing,
    getListings: function(){
      var defer = $q.defer();
      $http({
        url: 'https://inhouse-api.herokuapp.com/api/v1/listing/21613406'
      }).then(function(res){
        defer.resolve(res)
      }, function(err){
        console.log('svc err: ', err);
      })
      return defer.promise;
    }
  };

});
