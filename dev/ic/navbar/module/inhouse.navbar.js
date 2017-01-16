angular.module('ihframework')
.directive('ihNavbar', ['$rootScope', '$window', function($rootScope, $window) {
	return {
		template: '<ng-include src="theUrl()" class="{{classes}}"><ng-include>',
		scope: {
			classes: "@classes",
			config: '@'
		},
		restrict: 'E',
		controller: function($rootScope, $scope, $filter, $document) {
			if($scope.config == undefined) {
				$scope.config = $rootScope.theWebsiteData.navbarConfig;
			}
			
			$scope.theUrl = function(){
				return 'build/templates/ic/navbar/template/' + $scope.config + '-inhouse.navbar.html';
			};

			$scope.$on('viewChanged', function(event, args) {
				$scope.controller = args;
			});
			$scope.signIn = function() {
				this.$parent.$parent.showRegister = false;
				$('#accountModal').modal('show');
			};
			$scope.$on('loginChanged', function(event, args) {
				$scope.inhouseAgentLeadLoggedIn = args;
			});
			$scope.inhouseAgentLeadLoggedIn = $scope.$parent.inhouseAgentLeadLoggedIn;
			$scope.navbar = $rootScope.theWebsiteData.NavBar;
			$scope.halfway = Math.ceil($scope.navbar.length/2);
			if(typeof $rootScope.theWebsiteData.navbarClasses !== 'undefined') {
				$scope.classes = $rootScope.theWebsiteData.navbarClasses;
			}
			$scope.agent = $rootScope.theUserData;

			$scope.scrollToElement = function(id) {
				$document.scrollToElement(angular.element(document.getElementById('ih-component-' + id)), 0, 1000);
			};
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
