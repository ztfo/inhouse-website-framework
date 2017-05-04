angular.module('ihframework')
.factory('ihLead', ['$uibModal', '$rootScope', function($uibModal, $rootScope) {
  var lead = {};

  modalController = ['inhouseApi', '$scope', '$uibModalInstance', 'ihLead', function(inhouseApi, $scope, $uibModalInstance, ihLead) {
    $scope.submitRegister = function(user) {
      inhouseApi.newApi.leadLogin(user).success(function(response) {
        ihLead.id = _.get(response, 'data.lead.uuid');

        if(!ihLead.id) {
          $scope.loginError = true;
          return false;
        }


        $uibModalInstance.close(true);

      }).error(function(response) {
        $scope.loginError = true;
      });
    };
  }];

  return {
    get id() {
      var id = _.get(localStorage, 'inhouseAgentLead');

      if(!id) {
        return null;
      }

      if(this.isValid(id)) {
        return id;
      }

      return null;
    },
    get likes() {
      if(_.get(localStorage, 'inhouseAgentLeadLikes')) {
        return JSON.parse(_.get(localStorage, 'inhouseAgentLeadLikes'));
      }

      return [];
    },
    set likes(value) {
      _.set(localStorage, 'inhouseAgentLeadLikes', JSON.stringify(value));
    },
    set id(value) {
      if(this.isValid(value)) {
        _.set(localStorage, 'inhouseAgentLead', value);
      } else {
        this.capture();
      }
    },
    get views() {
      var views = _.get(localStorage, 'inhouseViewedListings');

      if(views) return JSON.parse(views);

      return [];
    },
    set views(value) {
      return _.set(localStorage, 'inhouseViewedListings', JSON.stringify(value));
    },
    likesListing: function(listing) {
      return _.indexOf(this.likes, listing) !== -1;
    },
    likeListing: function(listing) {
      var likes = this.likes;
      likes.push(listing);
      this.likes = likes;
    },
    viewListing: function(listing, callback) {
      if(_.indexOf(this.views, listing) < 0) {
        var views = this.views;
        views.push(listing);
        this.views = views;
      }

      if(!callback) {
        return;
      }

      if(this.views.length > 3) {
        this.capture(callback);
      } else {
        callback();
      }
    },
    get searchCount() {
      var count = parseInt(_.get(localStorage, 'inhouseSearchCount'));

      if(count) return count;

      return 0;
    },
    set searchCount(value) {
      _.set(localStorage, 'inhouseSearchCount', value);
    },
    searchMls: function(callback, maxSearches) {
      if(!maxSearches) {
        maxSearches = 6;
      }

      this.searchCount += 1;

      if(this.searchCount > maxSearches) {
        this.capture(callback);
      }

      if(callback) {
        callback();
      }
    },
    capture: function(callback) {
      if($rootScope.theWebsiteData.disableLeadSignup || this.id) {
        if(callback) {
          callback();
        }

        return;
      }

      this.openModal(callback);
    },
    dismissModal: function() {
      if(this.modalInstance) {
        this.modalInstance.close(true);
      }
    },
    openModal: function(callback) {
      var rejected = (function(lead, callback) {
        return function() {
          lead.capture(callback);
        };
      })(this, callback);

      this.modalInstance = $uibModal.open({
        templateUrl: 'build/templates/ic/modal/template/register-modal.inhouse.html',
        controller: modalController,
        windowClass: 'account-modal'
      });

      this.modalInstance.result.then(callback, rejected);
    },
    isValid: function(id) {
      if(!id)
        id = this.id;

      return /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.exec(id);
    }
  };
}]);
