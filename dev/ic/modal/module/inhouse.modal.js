angular.module('ihframework')
.directive('ihModal', [function() {
  return {
    restrict: 'E',
    scope: {
      config: '@',
      id: '@',
      confirm: '@'
    },
    templateUrl: 'build/templates/ic/modal/template/s1-modal.inhouse.html',
    link: function(scope, element, attrs) {
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
