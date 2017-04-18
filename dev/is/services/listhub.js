angular.module('ihframework')
.factory('listhub', ['$window', function($window) {
  return {
    /**
     * Triggered when a listing is liked by a user
     * @param  string listing listing ID number
     * @return void
     */
    listingLiked: function(listing) {
      this.sendEvent('LISTING_SAVED', {lkey: listing});
    },

    /**
     * Triggered when someone views a listing details page
     * @param  string listing isting ID number
     * @return void
     */
    detailPage: function(listing) {
      this.sendEvent('DETAIL_PAGE_VIEWED', {lkey: listing});
    },

    /**
     * Contact email was sent
     * @param  string listing listing ID number
     * @return void
     */
    emailSent: function(listing) {
      this.sendEvent('AGENT_EMAIL_SENT', {lkey: listing});
    },

    /**
     * Triggered when listings are searched
     * @param  object listings listing data that was returned from InHouse
     * @return void
     */
    listingsSearched: function(listings) {
      var mlsNumbers = _.map(listings, function(listing) {
        return {lkey: _.get(listing, 'mls')};
      });

      this.sendEvent('SEARCH_DISPLAY', mlsNumbers);
    },

    /**
     * Triggered when listings are shared on fb or other
     * @param  string listing listing ID number
     * @param  string source  social media source shared to
     * @return void
     */
    listingShared: function(listing, source) {
      this.sendEvent('SHARED_' + source, {lkey: listing});
    },

    /**
     * Function responsible for sending the event to listhub
     *
     * Setting window.test = true will override the listhub sending and simply
     * log the event to the console.
     *
     * @param  string e    event type
     * @param  object data object containing any data to send to listhub
     * @return void
     */
    sendEvent: function(e, data) {
      if($window.logListhubEventsToConsole) {
        console.log(e);
        console.log(data);
        return;
      }

      if($window.lh) {
        lh(e, data);
      }
    }
  };
}]);
