angular.module('ihframework')
.directive('ihNavbar', ['$rootScope', '$window', function($rootScope, $window) {
	return {
		template: '<ng-include src="theUrl()"><ng-include>',
		scope: {
			classes: "@classes"
		},
		restrict: 'E',
		controller: function($rootScope, $scope, $filter) {
			$scope.config = $rootScope.theWebsiteData.navbarConfig;
			$scope.theUrl = function(){
				return 'build/templates/ic/navbar/template/' + $scope.config + '-inhouse.navbar.htm';
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
			$scope.navbar = $rootScope.theWebsiteData.NavBar;
			$scope.halfway = Math.ceil($scope.navbar.length/2);
			if(typeof $rootScope.theWebsiteData.navbarClasses !== 'undefined') {
				$scope.classes = $rootScope.theWebsiteData.navbarClasses;
			}
			$scope.agent = $rootScope.theUserData;
		}



	};
}]);
