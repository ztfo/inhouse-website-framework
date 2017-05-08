angular.module('ihframework')
.directive('ihResourceBlock', function() {
  return {
    templateUrl: 'build/templates/ic/resources-block/template/s1.html',
    scope: {
      config: '=',
      resource: '='
    },
    controller: ['$scope', function($scope) {
      $scope.url = $scope.resource.externalUrl ? $scope.resource.externalUrl : "#/" + ($scope.resource.key || key);

      $scope.target = $scope.resource.externalUrl ? '_blank' : '_self';
    }]
  };
});
