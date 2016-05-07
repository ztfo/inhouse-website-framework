angular.module('inhouseApp')
.factory('inhouseApi', function($http) {
	var urlBase = 'https://www.getinhouse.io/api/v1/';
	var urlBase = 'http://localhost/inhouse-canvas/api/v1/';
	var inhouseApi = {};
	var userId = window.agentSettings.userId;
	var userHash = window.agentSettings.userHash;

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
