
app.controller('LogoutController',  ['$scope', '$http', '$log', '$q', '$timeout', '$routeParams', '$location', 'MainService','CartService',
    function ($scope, $http, $log, $q, $timeout, $routeParams, $location, MainService,CartService) {

        $scope.init = function(){
            CartService.clearAll();
            $location.path("/main");
        };



    }]);

