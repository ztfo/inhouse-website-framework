angular.module('ihframework')
.directive('ihContact', ['$timeout', function($timeout) {
	return {
		template: '<ng-include src="templateUrl" class="{{classes}}"></ng-include>',
		transclude: true,
		scope: {
			contactMessage: "@message",
			noButtons: "@noButtons",
			prefill: "@prefill",
			prefillPrefix: "@",
			classes: "@classes",
			typeofcontact: '@typeofcontact',
			config: '=',
			configname: '@',
			message: '=',
			listing: '='
		},
		link: function(scope, element, attrs) {
			if(typeof scope.contact == 'undefined') {
				scope.contact = {};
			}
			scope.contact.typeofcontact = attrs.typeofcontact || "BuyAHome";
			scope.element = element;
			element.find('input[type="radio"]').each(function() {
				$(this).click(function() {
					$(this).parents('.btn-group').find('label').removeClass('active');
					$(this).parent('label').addClass('active');
				});
			});
		},
		controller: ['$rootScope', '$scope', 'inhouseApi', 'userDataService', function($rootScope, $scope, inhouseApi, userDataService) {

			$scope.story_type = $rootScope.theWebsiteData.story_type;
			
			if($scope.message != undefined) {
				if($scope.contact == undefined) $scope.contact = {};
				$scope.contact.message = $scope.message;
			}
			//don't load dynamic if the static is set
			if($scope.configname == undefined) {
				$scope.$watch('config', function(newVal) {
					if(newVal !== undefined) {
						$scope.templateUrl = 'build/templates/ic/contact/template/' + $scope.config + '-inhouse.contact.html';
					} else {
						$scope.templateUrl = 'build/templates/ic/contact/template/s1-inhouse.contact.html';
					}
				});
			} else {
				$scope.templateUrl = 'build/templates/ic/contact/template/' + $scope.configname + '-inhouse.contact.html';
			}

			$timeout(function() {
				$scope.$broadcast('listingLoaded', {address: $rootScope.theUserData.contactAddress, zipcode: $rootScope.theUserData.contactAddress2});
			});

			$scope.navbar = $rootScope.theWebsiteData.NavBar;
			$scope.agent = $rootScope.theUserData;
			$scope.inhouseApi = inhouseApi;
			$scope.scope = $scope;

			if(typeof $scope.contact == 'undefined') {
				$scope.contact = {};
			}
			if(typeof window[$scope.prefill] !== 'undefined') {
				var pre = '';
				if(typeof $scope.prefillPrefix !== 'undefined') {
					pre = $scope.prefillPrefix;
				}
				$scope.contact.message = pre + window[$scope.prefill];
			}
			$scope.submitContact = function() {
				var contact = this.scope.contact;
				contact.form = this.scope.contactMessage;
				var api = this.scope.inhouseApi;
				$scope.contactSending = true;
				contact.story_type = $scope.story_type;
				api.newApi.postContactLead(contact).success((function($scope) {
//				api.getData({resource: 'submit-contact', contact: contact}).success((function($scope) {
					return function(response) {
						delete $scope.contactSending;
						$scope.contactSent = true;
					};
				})($scope));
			};
		}]
	};
}]);
