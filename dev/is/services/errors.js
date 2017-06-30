angular.module('ihframework')
.factory('errors', function() {
  return {
    build: function(errors) {
      notify = [];

      if(typeof _.get(errors, 'data.error') != 'string') {
        _.each(errors.data.error, function(error, k) {
          var message = error;

          if(k.split('.')) {
            k = k.split('.')[k.split('.').length - 1];
          }

          if(k) {
            message = k.charAt(0).toUpperCase() + k.slice(1) + ': ' + message;
          }

          notify.push(message);
        });
      }

      if(typeof _.get(errors, 'data.error') === 'string') {
        notify[0] = _.get(errors, 'data.error');
      }

      return notify;
    }
  };
});
