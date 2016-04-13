angular.module('inhouseApp')
.directive('ihContact', function() {
	return {
		templateUrl : function(el, attrs) {
			return 'ic/contact/template/' + (attrs.config || 's1') + '-inhouse.contact.htm';
		},
		transclude: true,
		scope: {
			contactMessage: "@message",
			noButtons: "@noButtons",
			prefill: "@prefill",
			prefillPrefix: "@"
		},
		link: function(scope, element, attrs) {
			if(typeof scope.contact == 'undefined') {
				scope.contact = {};
			}
			scope.contact.typeOfContact = "BuyAHome";
			scope.element = element;
			element.find('input[type="radio"]').each(function() {
				$(this).click(function() {
					$(this).parents('.btn-group').find('label').removeClass('active');
					$(this).parent('label').addClass('active');
				});
			});
		},
		controller: ['$scope', 'inhouseApi', function($scope, inhouseApi) {
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
				api.getData({resource: 'submit-contact', contact: contact}).success((function($scope) {
					return function(response) {
						if(response.result == 'success') {
							$scope.element.find('.alert').addClass('hidden');
							$scope.element.find('.alert-success').removeClass('hidden');
							//tell user it worked
						} else {
							$scope.element.find('.alert').addClass('hidden');
							$scope.element.find('.alert-danger').removeClass('hidden');
							//notify user it didn't work
						}
					};
				})($scope));
			};
		}]
	};
});
