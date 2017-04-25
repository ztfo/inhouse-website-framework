angular.module('ihframework')
.factory('inhouseApi', ['$http', '$rootScope', 'listhub', 'ihLead', function($http, $rootScope, listhub, ihLead) {
  var urlBase = 'https://www.getinhouse.io/api/v1/';
  var appUrl = window.inhouseApiUrl == undefined ? 'https://app.getinhouse.io/' : window.inhouseApiUrl;

  var newApi = appUrl + 'api/v1/web/';
  var inhouseApi = {};
  var userId = $rootScope.theUserData.userId;
  var userHash = $rootScope.theUserData.userHash;

  inhouseApi.newApi = {};

  inhouseApi.newApi.postContactLead = function(contact) {
    //store contact type
    _.set(contact, 'story_type', _.get($rootScope, 'theWebsiteData.story_type'));

    if(contact.note == undefined && contact.message != undefined) contact.note = contact.message;

    contact.callback = 'JSON_CALLBACK';

    url = newApi + 'user/' + userId + '/lead?' + $.param(contact);
    return $http.jsonp(url).success(function(response) {
      listhub.emailSent(_.get(contact, 'story_type.source'));
    });
  };

  inhouseApi.newApi.getTestimonials = function() {
    url = newApi + 'user/' + userId + '/testimonials?callback=JSON_CALLBACK';

    return $http.jsonp(url);
  };

  inhouseApi.newApi.leadLogin = function(data) {
    _.set(data, 'story_type', _.get($rootScope, 'theWebsiteData.story_type'));

    url = newApi + 'user/' + userId + '/lead?callback=JSON_CALLBACK&' + $.param(data);

    return $http.jsonp(url).success(function(response) {
      ihLead.likes = _.map(_.get(response, 'data.likes'), function(like) {
        return _.get(like, 'mls');
      });
    });
  };

  inhouseApi.newApi.leadLikeListing = function(data) {

    data = $.extend({}, data);
    data.callback = 'JSON_CALLBACK';

    data.lead = ihLead.id;

    url = newApi + 'lead/' + data.lead + '/like?' + $.param(data);

    listhub.listingLiked(_.get(data, 'mls'));
    ihLead.likeListing(data.mls);

    return $http.jsonp(url);
  };

  inhouseApi.newApi.searchMls = function(data) {

    data = $.extend({}, data);
    data.callback = 'JSON_CALLBACK';

    data.lead = ihLead.id;

    if(typeof window.geolocation !== 'undefined') {
      if(typeof data.params === 'undefined') {
        data.params = {};
      }
      data.params.geolocation = window.geolocation;
    }

    url = newApi + 'user/' + userId + '/search?' + $.param(data);

    return $http.jsonp(url).success(function(response) {
      listhub.listingsSearched(_.get(response, 'data.listings'));

      ihLead.searchMls();
    });
  };

  inhouseApi.newApi.getSliderImages = function(key) {
    data = {};

    data.callback = 'JSON_CALLBACK';

    url = newApi + 'user/' + userId + '/slider-images/' + JSON.stringify(key) + '?' + $.param(data);

    return $http.jsonp(url);
  };
  inhouseApi.newApi.getListingDetails = function(key, version) {
    data = {};

    data.callback = 'JSON_CALLBACK';

    if(typeof Storage !== 'undefined') {
      if(typeof localStorage.inhouseAgentLead !== 'undefined') {
        data.lead = localStorage.inhouseAgentLead;
      }
    }

    if(version == undefined) {
      version = 'v1';
    }

    url = appUrl + 'api/' + version + '/web/user/' + userId + '/listing/' + key + '?' + $.param(data);

    listhub.detailPage(key);

    return $http.jsonp(url);
  };
  inhouseApi.newApi.featuredListings = function(key) {
    data = {};

    data.callback = 'JSON_CALLBACK';

    url = newApi + 'user/' + userId + '/featured-listings/' + JSON.stringify(key) + '?' + $.param(data);

    return $http.jsonp(url);
  };

  return inhouseApi;
}]);
