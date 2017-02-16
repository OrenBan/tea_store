
app.controller('MainController', ['$scope', '$http', '$log', '$q', '$timeout', '$routeParams', '$location', 'MainService',
    function ($scope, $http, $log, $q, $timeout, $routeParams, $location, MainService) {
        $scope.foundedProducts=[];
        $scope.init = function(){
            document.title = "Tea Store";
            $scope.initMaster().then(function(masterLoaded){

                MainService.getProducts().then(function(foundedProducts){
                    var orderedProducrs = Enumerable.From(foundedProducts)
                        .OrderByDescending("$.Price*(1-($.Discount_prc/100))").Take(12)
                        .ToArray();
                        $scope.foundedProducts = orderedProducrs;
                });
            });
        };



    }]);

