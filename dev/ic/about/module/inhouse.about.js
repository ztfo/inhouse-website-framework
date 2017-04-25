angular.module('ihframework')
.directive('ihAbout', function() {
  return {
    scope: {
      classes: "@classes",
      config: '='
    },
    template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
    restrict: 'E',
    controller: function($scope, $rootScope, userDataService, $document) {
      $scope.$watch('config', function(newVal) {
        if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/about/template/' + newVal + '-inhouse.about.html';
        } else {
          $scope.templateUrl = 'build/templates/ic/about/template/s1-inhouse.about.html';
        }
      });

      $scope.$on('agents clicked', function(event, args){
        $scope.lenderOnly = args.data;
      });

      $scope.agent = $rootScope.theUserData;
      $scope.site = $rootScope.theWebsiteData;

      $scope.$on('lenders clicked', function(event, args){
        $scope.lenderOnly = args.data;
      });

      if($rootScope.theWebsiteData.lender !== undefined) {
        $scope.lender = $rootScope.theWebsiteData.lender;
      }
      $scope.agent = $rootScope.theUserData;
    }
  };
});
