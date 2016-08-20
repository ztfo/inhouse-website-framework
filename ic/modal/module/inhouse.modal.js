angular.module('ihframework')
.directive('ihModal', [function() {
	return {
		restrict: 'E',
		scope: {
			config: '@',
			id: '@',
			confirm: '@'
		},
		template: "<div ng-include='templateUrl()'></div>",
		link: function(scope, element, attrs) {
			scope.templateUrl = function() {
				return 'ic/modal/template/' + (scope.config || 's1') + '-modal.inhouse.htm';
			}
			scope.$on('showModal', function(event, args) {
				scope.modal = args.modal;
				if(scope.id == args.id) {
					element.find('.modal').modal('show');
				}
			});
			element.find('.modal').on('bs.modal.hide', function() {
				scope.$emit('modalClosed', {modal: scope.id});
			});
		},
		controller: function($scope) {
		}
	};
}]);
