
app.controller('CartController', ['$scope', '$http', '$log', '$q', '$timeout', '$routeParams', '$location', 'MainService','CartService',
    function ($scope, $http, $log, $q, $timeout, $routeParams, $location, MainService,CartService) {

        $scope.init = function(){
            $scope.cartItems = [];
            $scope.initMaster().then(function(masterLoaded){
                $scope.refreshCartItem();

            });
        };

        $scope.getCartItems = function(){
            return CartService.getAllCart();
        };
        $scope.refreshCartItem = function()
        {
            $scope.cartItems = $scope.getCartItems();
            $scope.displayCart=false;
            if($scope.cartItems.length>0){
                for (i = 0; i < $scope.cartItems.length; i++) {
                    if ($scope.cartItems[i].quantity > 0)
                        $scope.displayCart = true;
                }
            }
        }
        $scope.addCart = function(productId,quantity)
        {
            CartService.addProduct(undefined,productId,quantity);
            $scope.refreshCartItem();
        };
$scope.checkout = function(){
    alert('under constructions');
};

    }]);

