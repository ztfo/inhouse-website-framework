angular.module('ihframework').factory('userData', function($http, $q, $window){

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
    theUserData: '',
    theWebsiteData: '',
    getUserData: function(){
      var defer = $q.defer();

      if(!this.theUserData){
        $http({
          url: 'api/v1/user-settings',
          method: 'GET'
        }).then(function(res_one){
          defer.resolve(res_one.data);
        },function(err){
          console.log("svc err:, ", err);
        });
        this.theUserData = defer.promise;
      }
      return this.theUserData;


    },
    getWebsiteData: function(){

      var defer = $q.defer();

      if(!this.theWebsiteData){
        $http({
          url: 'api/v1/story-settings',
          method: 'GET'
        }).then(function(res_two){
          defer.resolve(res_two.data);
        },function(err){
          console.log("svc err:, ", err);
        });
        this.theWebsiteData = defer.promise;
      }
      return this.theWebsiteData;
    },
    getWebsiteTemplate: function(){

      var defer = $q.defer();

      $http({
        url: 'api/v1/story-settings',
        method: 'GET'
      }).then(function(res_three){
        var theTemplateOne = templateBuilder(res_three.data.data).join(',').replace(/,/g, '');
        defer.resolve(theTemplateOne);
      },function(err){
        console.log("svc err:, ", err);
      });
      return defer.promise;
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
    }
  };

});
