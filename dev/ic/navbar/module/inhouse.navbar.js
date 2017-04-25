angular.module('ihframework')
.directive('ihNavbar', ['$rootScope', '$window', function($rootScope, $window) {
  return {
    template: '<ng-include src="theUrl()" class="{{classes}}"><ng-include>',
    scope: {
      classes: "@classes",
      config: '@',
      shareUrl: '='
    },
    restrict: 'E',
    controller: function($rootScope, $scope, $filter, $document) {
      if($scope.config == undefined) {
        $scope.config = $rootScope.theWebsiteData.navbarConfig;
      }

      // added shareUrl to scope so p1-inhouse.navbar can access it
      if($scope.shareUrl == undefined) {
        $scope.shareUrl = window.location.href;
      }

      $scope.theUrl = function(){
        return 'build/templates/ic/navbar/template/' + $scope.config + '-inhouse.navbar.html';
      };
    }
  };
}]);
