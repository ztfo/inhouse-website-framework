angular.module('ihframework')
.directive('ihLandingLayout', ['$window', '$rootScope', function($window, $rootScope) {
  return {
    template: function() {
      var dirs = $rootScope.theWebsiteData.landingLayout;
      var beginningDivTag = '<div>',
          others = ' ',
          template = '';

      dirs.map(function(item, index, array){
        var keys = Object.keys(item),
            attributes = '';

        for(var key in item){
          attributes += key + '=\"' + item[key] + '\" ';
        }

        template += '<ih-' + item.component + others + attributes + '></ih-' + item.component + '>';
      });

      return beginningDivTag + template + '</div>';
    },
    replace: true,
    restrict: 'E'
  };
}]);
//
// <div>
//   <ih-slider config="s1" slider="mainSlider" ></ih-slider>
//   <ih-landing-search ></ih-landing-search>
//   <ih-divider config="logo" ></ih-divider>
//   <ih-about config="s1" ></ih-about>
//   <ih-featured-listings config="s1"></ih-featured-listings>
//   <ih-testimonials config="s1" testimonial="mainTests" ></ih-testimonials>
//   <ih-contact config="s1" message="How can we help?" ></ih-contact>
// </div>
