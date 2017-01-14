angular.module('ihframework')
.factory('inhouseApi', function($http, $rootScope) {
	var urlBase = 'https://www.getinhouse.io/api/v1/';
	var newApi = 'https://app.getinhouse.io/api/v1/web/';
	var inhouseApi = {};
	var userId = $rootScope.theUserData.userId;
	var userHash = $rootScope.theUserData.userHash;

	inhouseApi.newApi = {};
	
	inhouseApi.newApi.postContactLead = function(contact) {
		data = $.extend({}, data);
		if(contact.note == undefined && contact.message != undefined) contact.note = contact.message;
		contact.callback = 'JSON_CALLBACK';
		url = newApi + 'user/' + userId + '/lead?' + $.param(contact);
		return $http.jsonp(url);
	};
	
	inhouseApi.newApi.getTestimonials = function() {
		
		url = newApi + 'user/' + userId + '/testimonials?callback=JSON_CALLBACK';
		
		return $http.jsonp(url);
	};
	
	inhouseApi.newApi.leadLogin = function(data) {
		url = newApi + 'user/' + userId + '/lead?callback=JSON_CALLBACK&' + $.param(data);
		return $http.jsonp(url);
	};
	
	inhouseApi.newApi.leadLikeListing = function(data) {
		
		data = $.extend({}, data);
		data.callback = 'JSON_CALLBACK';
		
		if(typeof Storage !== 'undefined') {
			if(typeof localStorage.inhouseAgentUser !== 'undefined') {
				data.lead = localStorage.inhouseAgentUser;
			}
		}
		
		if(typeof window.geolocation !== 'undefined') {
			if(typeof data.params === 'undefined') {
				data.params = {};
			}
			data.params.geolocation = window.geolocation;
		}
		
		url = newApi + 'lead/' + data.lead + '/like?' + $.param(data);
		
		return $http.jsonp(url);
	};
	inhouseApi.newApi.searchMls = function(data) {
		
		data = $.extend({}, data);
		data.callback = 'JSON_CALLBACK';
		
		if(typeof Storage !== 'undefined') {
			if(typeof localStorage.inhouseAgentUser !== 'undefined') {
				data.lead = localStorage.inhouseAgentUser;
			}
		}
		
		if(typeof window.geolocation !== 'undefined') {
			if(typeof data.params === 'undefined') {
				data.params = {};
			}
			data.params.geolocation = window.geolocation;
		}
		
		url = newApi + 'user/' + userId + '/search?' + $.param(data);
		
		return $http.jsonp(url);
	};
	inhouseApi.newApi.getSliderImages = function(key) {
		data = {};
		
		data.callback = 'JSON_CALLBACK';
		
		url = newApi + 'user/' + userId + '/slider-images/' + JSON.stringify(key) + '?' + $.param(data);
		
		return $http.jsonp(url);
	};
	inhouseApi.newApi.getListingDetails = function(key) {
		data = {};
		
		data.callback = 'JSON_CALLBACK';
		
		if(typeof Storage !== 'undefined') {
			if(typeof localStorage.inhouseAgentUser !== 'undefined') {
				data.lead = localStorage.inhouseAgentUser;
			}
		}
		
		url = newApi + 'user/' + userId + '/listing/' + mls + '?' + $.param(data);
		
		return $http.jsonp(url);
	};
	inhouseApi.newApi.featuredListings = function(key) {
		data = {};
		
		data.callback = 'JSON_CALLBACK';
		
		url = newApi + 'user/' + userId + '/featured-listings/' + JSON.stringify(key) + '?' + $.param(data);
		
		return $http.jsonp(url);
	};
	
	inhouseApi.getData = function(data) {
		data.userId = userId;
		data.userHash = userHash;
		data.callback = 'JSON_CALLBACK';

		if(typeof Storage !== 'undefined') {
			if(typeof localStorage.inhouseAgentUser !== 'undefined') {
				data.inhouseAgentUser = localStorage.inhouseAgentUser;
			}
		}
		if(typeof window.geolocation !== 'undefined') {
			if(typeof data.params === 'undefined') {
				data.params = {};
			}
			data.params.geolocation = window.geolocation;
		}

		var url = urlBase + (typeof data.resource !== 'undefined' ? data.resource : '') + '?' + $.param(data);

		var result = $http.jsonp(url);
		return result;
	};

	return inhouseApi;
});
