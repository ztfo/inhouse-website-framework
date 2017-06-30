angular.module('ihframework')
.directive('ihContactFormErrors', function() {
  return {
    scope: {
      errors: '='
    },
    templateUrl: 'build/templates/ic/contact/template/errors.html'
  };
});
