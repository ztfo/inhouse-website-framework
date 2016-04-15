angular.module('inhouseApp')
.directive('ihLandingLayout', ['$window', function($window) {
	return {
		template: function() {
			var dirs = $window.storySettings.landingLayout;
			var template = '<div>';
			for (var k in dirs) {
				var others = ' ';
				if(typeof dirs[k] === 'object') {
					for (sK in dirs[k]) {
						others += sK + '="' + dirs[k][sK] + '" ';
					}
				}
				template += '<ih-' + k + others + '></ih-' + k + '>';
			}
			return template + '</div>';
		},
		replace: true,
		restrict: 'E'
	};
}]);
