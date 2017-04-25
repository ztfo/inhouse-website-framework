angular.module('ihframework')
.directive('ihDropdown', ['$routeParams', '$timeout', '$location', '$document', function($routeParams, $timeout, $location, $document) {
  return {
    restrict: 'E',
    templateUrl : function(el, attrs) {
      return 'build/templates/ic/dropdown/template/' + (attrs.config || 's1') + '-inhouse.dropdown.html';
    },
    require: 'ngModel',
    transclude: true,
    scope: {
      'classes' : '@',
      'menuItems': '=items',
      'val' : '@name',
      'name' : '@name',
      'origName' : '@name',
      'dropdownId' : '@id',
      'truncate' : '@truncate',
      'multiSelect' : '@multi'
    },
    link: function(scope, element, attrs, ngModelCtrl) {
      scope.multiSelectList = {};


      if(typeof attrs.class == 'undefined') {
        scope.classes = "ih-search-dropdown dropdown full";
      } else {
        scope.classes = attrs.class;
      }

      scope.$watch(function() {
        return ngModelCtrl.$modelValue;
      }, function(newVal) {
        if(typeof newVal === 'undefined') {
          scope.multiSelectList = {};
          scope.name = scope.origName;
          scope.val = '';
        }
        scope.name = scope.origName;
        if(typeof newVal != 'undefined') {
          if(newVal.indexOf(';') !== -1) {
            var vals = scope.$parent.filters[attrs.id].split(';')
            for (var i = 0; i < vals.length; i++) {
              scope.multiSelectList[vals[i]] = true;
            }
          }
          if(typeof scope.multiSelectList !== 'undefined') {
            var keys = Object.keys(scope.multiSelectList);
            if(keys.length > 1) {
              scope.name = scope.origName + " | " + 'Multiple';
            } else {
              var display = typeof scope.truncate != 'undefined' && scope.truncate != '' ? newVal.substr(0,parseInt(scope.truncate)) : newVal;
              scope.name += ' | ' + display;
            }
          } else {
            var display = typeof scope.truncate != 'undefined' && scope.truncate != '' ? newVal.substr(0,parseInt(scope.truncate)) : newVal;
            scope.name += ' | ' + display;
          }
        }
      });

      scope.selectAttribute = function(val, name, $event) {
        if(typeof scope.multiSelectList == 'object' && scope.multiSelect == 'true') {
          $event.preventDefault();
          if(typeof scope.multiSelectList[val] !== 'undefined') {
            delete scope.multiSelectList[val];
          } else {
            scope.multiSelectList[val] = true;
          }

          val = '';
          var keys = Object.keys(scope.multiSelectList);
          for (var i = 0; i < keys.length; i++) {
            val += ';' + keys[i];
          }
          val = val.substr(1);

        } else { // single select
          var display = typeof scope.truncate != 'undefined' && scope.truncate != '' ? name.substr(0,parseInt(scope.truncate)) : name;
          scope.name = scope.origName + " | " + display;
        }
        scope.val = val;
        ngModelCtrl.$setViewValue(val);
        if(typeof scope.multiSelect !== 'undefined' && scope.multiSelect == 'true') {
          $event.preventDefault();
          return false;
        } else {
          scope.dropdownOpen = false;
        }
      };

      $timeout((function(scope, element, attrs) {
        return function() {
          var newval = ngModelCtrl.$modelValue;
          if(scope.multiSelect == 'true') {
            element.find('a').click(function(e) {
              e.stopPropagation;
              e.preventDefault();
              return false;
            });
          }
          if(typeof scope.$parent.filters !== 'undefined' && typeof scope.$parent.filters[attrs.id] !== 'undefined') {
            if(scope.$parent.filters[attrs.id].indexOf(';') !== -1) {
              var vals = scope.$parent.filters[attrs.id].split(';')
              for (var i = 0; i < vals.length; i++) {
                scope.multiSelectList[vals[i]] = true;
              }
            }
            if(typeof scope.multiSelectList !== 'undefined' && scope.multiSelect == 'true') {
              var keys = Object.keys(scope.multiSelectList);
              if(keys.length > 1) {
                scope.name = scope.origName + " | " + 'Multiples';
              } else {
                var display = typeof scope.truncate != 'undefined' && scope.truncate != '' ? newVal.substr(0,parseInt(scope.truncate)) : newVal;
                scope.name += ' | ' + display;
              }
            } else {
              scope.name = scope.origName + " | " + scope.val;
            }
            scope.val = scope.$parent.filters[attrs.id];
            ngModelCtrl.$setViewValue(scope.val);
          }
        };
      })(scope, element, attrs));
    }
  };
}]);
