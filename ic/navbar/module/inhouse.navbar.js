angular.module('ihframework')
.directive('ihNavbar', ['$rootScope', '$window', function($rootScope, $window) {
	return {
		template: '<ng-include src="theUrl()"><ng-include>',
		scope: {
			classes: "@classes"
		},
		restrict: 'E',
		controller: function($scope, $filter) {
			$scope.theUrl = function(config){
				config = 's1';
				return 'build/templates/ic/navbar/template/' + config + '-inhouse.navbar.htm';
			};

			$scope.$on('viewChanged', function(event, args) {
				$scope.controller = args;
			});
			$scope.signIn = function() {
				this.$parent.$parent.showRegister = false;
				$('#accountModal').modal('show');
			};
			$scope.$on('loginChanged', function(event, args) {
				$scope.inhouseAgentUserLoggedIn = args;
			});
			$scope.inhouseAgentUserLoggedIn = $scope.$parent.inhouseAgentUserLoggedIn;
			$scope.navbar = window.storySettings.NavBar;
			$scope.halfway = Math.ceil($scope.navbar.length/2);
			if(typeof window.storySettings.navbarClasses !== 'undefined') {
				$scope.classes = window.storySettings.navbarClasses;
			}
			$scope.agent = window.agentSettings;
		}



	};
}]);
