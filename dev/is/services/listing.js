angular.module('ihframework')
.factory('listing', ['inhouseApi', function(inhouseApi) {
  return {
    search: function(params) {
      return inhouseApi.newApi.searchMls(params);
    },
    fetch: function(id) {
      inhouseApi.newApi.getListingDetails(id, 'v2').success((function(listing) {
        return function(response) {
          listing.listingLoaded = true;
          listing.loadData(_.get(response, 'data.listing'));
        };
      })(this));

      return this;
    },
    loadData: function(data) {
      this.listingData = data;

      //handle v1 stuff
      if(!_.get(data, 'Details')) {
        _.set(this, 'listingData.Details', this.listingData);
      }

      this.ready = true;
    },
    hydrate: function(data) {

      var listing = _.create(this);

      listing.loadData(data);

      return listing;
    },
    get listings() {
      if(!this._listings) return [];

      return this._listings;
    },
    set listings(value) {
      this._listings = value;
    },
    set ready(value) {
      this.listingLoaded = value;
    },
    get ready() {
      return this.listingLoaded;
    },
    get details() {
      return this.listingData;
    },
    get url() {
      return _.get(this, 'listingData.Details.url');
    },
    get address() {
      return _.get(this, 'listingData.Details.address');
    },
    get agentAddress() {
      return _.get(this, 'listingData.Details.agentAddress');
    },
    get agentAssociation() {
      return _.get(this, 'listingData.Details.agentAssociation');
    },
    get agentEmail() {
      return _.get(this, 'listingData.Details.agentEmail');
    },
    get agentName() {
      return _.get(this, 'listingData.Details.agentName');
    },
    get agentPhone() {
      return _.get(this, 'listingData.Details.agentPhone');
    },
    get area() {
      return _.get(this, 'listingData.Details.area');
    },
    get baths() {
      return _.get(this, 'listingData.Details.baths');
    },
    get beds() {
      return _.get(this, 'listingData.Details.beds');
    },
    get brokerage() {
      return _.get(this, 'listingData.Details.brokerage');
    },
    get city() {
      return _.get(this, 'listingData.Details.city');
    },
    get community() {
      return _.get(this, 'listingData.Details.community');
    },
    get countyOrParish() {
      return _.get(this, 'listingData.Details.countyOrParish');
    },
    get documents() {
      return _.get(this, 'listingData.Details.documents');
    },
    get garage() {
      return _.get(this, 'listingData.Details.garage');
    },
    get latlong() {
      return _.get(this, 'listingData.Details.latlong');
    },
    get lotsize() {
      return _.get(this, 'listingData.Details.lotsize');
    },
    get mls() {
      return _.get(this, 'listingData.Details.mls');
    },
    get mlsAssociation() {
      return _.get(this, 'listingData.Details.mlsAssociation');
    },
    get photos() {
      return _.get(this, 'listingData.Details.photos');
    },
    get price() {
      return _.get(this, 'listingData.Details.price');
    },
    get primaryPhoto() {
      return _.get(this, 'listingData.Details.primaryPhoto');
    },
    get psf() {
      return _.get(this, 'listingData.Details.psf');
    },
    get publicRemarks() {
      return _.get(this, 'listingData.Details.publicRemarks');
    },
    get sizeUnit() {
      return _.get(this, 'listingData.Details.sizeUnit');
    },
    get sqft() {
      return _.get(this, 'listingData.Details.sqft');
    },
    get state() {
      return _.get(this, 'listingData.Details.state');
    },
    get status() {
      return _.get(this, 'listingData.Details.status');
    },
    get stories() {
      return _.get(this, 'listingData.Details.stories');
    },
    get thumb() {
      return _.get(this, 'listingData.Details.thumb');
    },
    get type() {
      return _.get(this, 'listingData.Details.type');
    },
    get yearBuilt() {
      return _.get(this, 'listingData.Details.yearBuilt');
    },
    get zipcode() {
      return _.get(this, 'listingData.Details.zipcode');
    }
  };
}]);
