angular.module('inhouseApp')
.directive('ihContact', ['$timeout', function($timeout) {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/contact/template/' + (attrs.config || 's1') + '-inhouse.contact.htm';
		},
		transclude: true,
		scope: {
			contactMessage: "@message",
			noButtons: "@noButtons",
			prefill: "@prefill",
			prefillPrefix: "@",
			classes: "@classes",
			typeofcontact: '@typeofcontact'
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
		controller: ['$scope', 'inhouseApi', function($scope, inhouseApi) {
			$timeout(function() {
				$scope.$broadcast('listingLoaded', {address: window.agentSettings.contactAddress, zipcode: window.agentSettings.contactAddress2});
			});
			$scope.navbar = window.storySettings.NavBar;
			$scope.agent = window.agentSettings;
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
				api.getData({resource: 'submit-contact', contact: contact}).success((function($scope) {
					return function(response) {
						delete $scope.contactSending;
						if(response.result == 'success') {
							//tell user it worked
							$scope.contactSent = true;
						} else {
							//notify user it didn't work
							$scope.contactSendFailed = true;
						}
					};
				})($scope));
			};
		}]
	};
}]);
