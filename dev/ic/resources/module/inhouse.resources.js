angular.module('ihframework')
.directive('ihResources', function() {
  return {
    template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
    scope: {
      classes: "@classes",
      config: '=',
      title: '=',
      header: '@'
    },
    restrict: 'E',
    controller: function($rootScope, $scope, userDataService){
      $scope.$watch('config', function(newVal) {
        if(newVal !== undefined) {
          $scope.templateUrl = 'build/templates/ic/resources/template/' + $scope.config + '-inhouse.resources.html';
        } else {
          $scope.templateUrl = 'build/templates/ic/resources/template/s1-inhouse.resources.html';
        }
      });
    },
    link: function(scope, el, attrs) {
      scope.limit = attrs.limit || 3;
      var resources = [];
      var featured = [];

      var content = [];

      //content lives in user data?
      if(scope.$root.theUserData.content !== undefined) {
        content = scope.$root.theUserData.content;
      }

      //content lives in story data?
      if(scope.$root.theWebsiteData.content != undefined) {
        content = scope.$root.theWebsiteData.content;
      }

      //loop through resources to see if any are featured
      for (var i = 0; i < content.length; i++) {
        if(typeof content[i].featured !== 'undefined' && content[i].featured === true) { //featured flag
          featured.push(content[i]);
        } else {
          resources.push(content[i]);
        }
      }

      //show the featured ones first, then list the rest of them and let the directives take care of limiting the number of items displayed. (scope.limit which can also be set  using the limit attr
      scope.resources = featured.concat(resources);
    }
  };
});
