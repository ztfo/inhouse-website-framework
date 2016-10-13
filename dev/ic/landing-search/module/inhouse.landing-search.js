angular.module('ihframework')
    .directive('ihLandingSearch', ['$location', function($location) {
        return {
            template: '<ng-include src="templateUrl" class="{{classes}}"><ng-include>',
            restrict: 'E',
            replace: true,
            scope: {
                classes: "@classes",
                config: '=',
                configname: '@'
            },
            controller: function($rootScope, $scope, userDataService) {
                $scope.toggleSearchTabs = function(tab) {
                    $scope.searchTab = tab;
                };
                if ($scope.configname !== undefined) {
                    $scope.templateUrl = 'build/templates/ic/landing-search/template/' + $scope.configname + '-inhouse.landing-search.htm';
                } else {
                    $scope.$watch('config', function(newVal) {
                        if (newVal !== undefined) {
                            $scope.templateUrl = 'build/templates/ic/landing-search/template/' + $scope.config + '-inhouse.landing-search.htm';
                        } else {
                            $scope.templateUrl = 'build/templates/ic/landing-search/template/s1-inhouse.landing-search.htm';
                        }
                    });
                }

                $scope.agent = $rootScope.theUserData;
                $scope.filters = {
                    active: true
                };
                $scope.toggleButton = function($event, val) {
                    if (!$($event.target).hasClass('active')) {
                        this.filters[val] = true;
                    } else {
                        if (typeof this.filters[val] != 'undefined') {
                            delete this.filters[val];
                        }
                    }
                };
                $scope.searchMLS = function() {

                    if (typeof this.filters != 'undefined') {
                        this.filters.active = true;
                    }

                    if (typeof this.filters.mlsOrAddress !== 'undefined') {
                        //trim whitespace
                        this.filters.mlsOrAddress = this.filters.mlsOrAddress.trim();

                        //no spaces
                        if (this.filters.mlsOrAddress.indexOf(' ') == -1) {
                            this.filters.mls = this.filters.mlsOrAddress;
                        } else {
                            this.filters.address = this.filters.mlsOrAddress;
                        }

                        delete this.filters.mlsOrAddress;
                    }

                    //price filter split
                    if (typeof this.filters.price_from !== 'undefined') {
                        this.filters.price = this.filters.price_from + ';';
                    }
                    if (typeof this.filters.price_to !== 'undefined') {
                        if (typeof this.filters.price == 'undefined') {
                            this.filters.price = "0;";
                        }
                        this.filters.price += this.filters.price_to;
                    }
                    delete this.filters.price_from;
                    delete this.filters.price_to;

                    //beds filter split
                    if (typeof this.filters.min_beds !== 'undefined') {
                        this.filters.bedsRange = this.filters.min_beds + ';';
                    }
                    if (typeof this.filters.max_beds !== 'undefined') {
                        if (typeof this.filters.bedsRange == 'undefined') {
                            this.filters.bedsRange = "0;";
                        }
                        this.filters.bedsRange += this.filters.max_beds;
                    }
                    delete this.filters.max_beds;
                    delete this.filters.min_beds;

                    //sqft filter split
                    if (typeof this.filters.min_sqft !== 'undefined') {
                        this.filters.sqft = this.filters.min_sqft + ';';
                    }
                    if (typeof this.filters.max_sqft !== 'undefined') {
                        if (typeof this.filters.sqft == 'undefined') {
                            this.filters.sqft = "0;";
                        }
                        this.filters.sqft += this.filters.max_sqft;
                    }
                    delete this.filters.max_sqft;
                    delete this.filters.min_sqft;

                    //acres filter split
                    if (typeof this.filters.min_acres !== 'undefined') {
                        this.filters.lotsizeRange = this.filters.min_acres + ';';
                    }
                    delete this.filters.min_acres;

                    $location.path('search-mls').search(this.filters);
                };
                $scope.scrollToValue = function(id) {
                  $document.scrollToElement(angular.element(document.getElementById(id)), 0, 1000);
                };
            },
        };
    }]);
