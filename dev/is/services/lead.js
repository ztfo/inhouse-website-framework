angular.module('ihframework')
.factory('ihLead', ['$uibModal', '$rootScope', function($uibModal, $rootScope) {
  var lead = {};

  modalController = ['inhouseApi', '$scope', '$uibModalInstance', function(inhouseApi, $scope, $uibModalInstance) {
    $scope.submitRegister = function(user) {
      inhouseApi.newApi.leadLogin(user).success(function(response) {
        this.id = response.data.lead.uuid;

        if(!this.id) {
          this.capture();
          return;
        }

        $uibModalInstance.close(true);

      });
    };
  }];

  return {
    get id() {
      var id = _.get(localStorage, 'inhouseAgentLead');

      if(this.isValid(id)) {
        return id;
      }

      return null;
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
    viewListing(listing, callback) {
      if(_.indexOf(this.views, listing) > -1) {
        return;
      }

      var views = this.views;
      views.push(listing);
      this.views = views;
    },
    get searchCount() {
      var count = parseInt(_.get(localStorage, 'inhouseSearchCount'));

      if(count) return count;

      return 0;
    },
    set searchCount(value) {
      _.set(localStorage, 'inhouseSearchCount', value);
    },
    searchMls(callback) {
      this.capture(callback);
      this.searchCount += 1;
    },
    capture: function(callback) {
      if($rootScope.disableLeadSignup || this.isValid()) {
        return;
      }

      this.openModal(callback);
    },
    openModal: function(callback) {
      var handleClosing = (function(lead, callback) {
        return function() {
          lead.capture(callback);
        };
      })(this, callback);

      return $uibModal.open({
        templateUrl: 'build/templates/ic/modal/template/register-modal.inhouse.html',
        controller: modalController,
        resolve: {
          callback: callback
        }
      }).result.then(handleClosing, handleClosing);
    },
    isValid: function(id) {
      if(!id)
        id = this.id;

      return /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.exec(id);
    }
  };
}]);
