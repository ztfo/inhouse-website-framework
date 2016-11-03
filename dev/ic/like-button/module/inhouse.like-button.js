angular.module('ihframework')
.directive('ihLikeButton', ['inhouseApi', function(inhouseApi) {
	return {
		replace: true,
		templateUrl : 'build/templates/ic/like-button/template/s1-inhouse.like-button.html',
		restrict: 'E',
		scope: {
			mls: '@mls',
			address: '@address'
		},
		controller: function($scope) {
			$scope.likeButton = function($event) {
				var data = {};
				var button = $($event.target).parent();
				data.mls = $scope.mls;
				data.address = data.address = $scope.address;
				if(typeof Storage !== 'undefined') {
					if(typeof localStorage.inhouseAgentUser !== 'undefined') {
						inhouseApi.getData({resource: 'lead-like-listing', mls: data.mls, address: data.address}).success((function(el) {
							return function(response) {
								if(response.code == '200') {
									el.addClass('ih-liked'); //todo: change this to whatever class marks it as liked!
								}
							};
						})(button));
					} else {
						//have them register
						$('#accountModal').modal('show');
						$('#accountModal').on('hidden.bs.modal', (function(data, el) {
							return function() {
								if(typeof Storage !== 'undefined' && typeof localStorage.inhouseAgentUser !== 'undefined') {
									inhouseApi.getData({resource: 'lead-like-listing', mls: data.mls, address: data.address}).success(function(response) {
										if(response.code == '200') {
											el.addClass('ih-liked'); //todo: change this to whatever class marks it as liked!
										}
										$('#accountModal').off('hidden.bs.modal');
									});
								}
							};
						})(data, $(this)));
					}
				}
				$event.preventDefault();
				$event.stopPropagation();
			};
		}
	};
}]);
