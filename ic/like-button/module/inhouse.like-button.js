angular.module('inhouseApp')
.directive('ihLikeButton', ['inhouseApi', function(inhouseApi) {
	return {
		replace: true,
		templateUrl : 'ic/like-button/template/s1-inhouse.like-button.htm',
		restrict: 'E',
		scope: {
			mls: '@mls',
			address: '@address'
		},
		controller: function($scope) {
			$scope.likeButton = function($event) {
				data = {};
				data.mls = $(this).attr('data-mls');
				data.address = $(this).attr('data-address');
				if(typeof Storage !== 'undefined') {
					if(typeof localStorage.inhouseAgentUser !== 'undefined') {
						inhouseApi.getData({resource: 'lead-like-listing', mls: data.mls, address: data.address}).success((function(el) {
							return function(response) {
								if(response.code == '200') {
									el.addClass('ih-liked'); //todo: change this to whatever class marks it as liked!
								}
							};
						})($(this)));
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
