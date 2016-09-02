angular.module('ihframework')
.directive('ihNavbar', ['$rootScope', '$window', function($rootScope, $window) {
	return {
		template: '<ng-include src="theUrl()" class="{{classes}}"><ng-include>',
		scope: {
			classes: "@classes"
		},
		restrict: 'E',
		controller: function($rootScope, $scope, $filter, $document) {
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

			$scope.scrollToAgent = function(id) {
				$rootScope.$broadcast('agents clicked', {data: false});
				$document.scrollToElement(angular.element(document.getElementById(id)), 0, 1000);
			};

			$scope.scrollToLender = function(id) {
				$rootScope.$broadcast('lenders clicked', {data: true});
				$document.scrollToElement(angular.element(document.getElementById(id)), 0, 1000);
			};
		}


	};
}]);
