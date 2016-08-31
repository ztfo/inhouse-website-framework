angular.module('ihframework').factory('userData', function($http, $q, $rootScope){

  var theUserData = '',
      theWebsiteData = '',
      theSelectedComponent = '';

  function templateBuilder(dirs_two){
    var templateArray = [];
		dirs_two.landingLayout.map(function(item, index, array){
			var others = ' ';
			var keys = Object.keys(item),
					attributes = '';

			for(var key in item){
				attributes += key + '=\"' + item[key] + '\" ';
			}
			// console.log(templateArray);
			templateArray.push('<ih-' + item.component + others + attributes + '></ih-' + item.component + `>`);
		});
		return templateArray;
	}

  return {
    selectedComponent: '',
    getWebsiteTemplate: function(){
        return templateBuilder($rootScope.theWebsiteData).join(',').replace(/,/g, '');
    },
    saveWebsiteChanges: function(website){
      var defer = $q.defer();
      console.log('the website: ', website);
      $http({
        url: 'api/v1/story-settings',
        method: 'PUT',
        data: {data: website}
      }).then(function(confirmSave){
        console.log(('confirm save: ', confirmSave));
      },function(err){
        console.log("svc err:, ", err);
      });
    },
    getTestimonials: function(){
      if(typeof $rootScope.theWebsiteData.testimonialSource != 'undefined') {
        if($rootScope.theWebsiteData.testimonialSource.hasOwnProperty('screenname')){
          return $http.get('https://inhouse-api.herokuapp.com/api/v1/web/user/1/testimonials/screenname=' + $rootScope.theWebsiteData.testimonialSource.screenname);
        } else if($rootScope.theWebsiteData.testimonialSource.hasOwnProperty('email')){
          return $http.get('https://inhouse-api.herokuapp.com/api/v1/web/user/1/testimonials/email=' + $rootScope.theWebsiteData.testimonialSource.email);
        }
      } else {
        return $q.defer().reject();
      }
    }
  };

});
