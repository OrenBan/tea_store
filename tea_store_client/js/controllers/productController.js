
app.controller('ProductController', ['$scope', '$http', '$log', '$q', '$timeout', '$routeParams', '$location', 'MainService','CartService',
    function ($scope, $http, $log, $q, $timeout, $routeParams, $location, MainService,CartService) {
        $scope.product={};
        $scope.init = function(){
            $scope.afterAdd = false;
            $scope.afterChange = false;
            $scope.isInCart = false;
            $scope.initMaster().then(function(masterLoaded){
                $scope.productId = $routeParams.id;
                $scope.quantity = undefined;
                $scope.productName = $routeParams.name;
                document.title = $routeParams.name;
                $scope.generalParameters.title = $scope.productName;
                MainService.getProduct($scope.productId).then(function(foundedProduct){
                    $scope.product = foundedProduct;
                    $scope.productCategory = Enumerable.From($scope.generalParameters.baseData.categories)
                        .First(function (x) { return x.Id == foundedProduct.Category_id });
                    var quantity = CartService.getProductQuantityCart(foundedProduct.Id);
                    if(quantity>0) {
                        $scope.quantity = quantity;
                        $scope.isInCart = true;
                    }
                });
            });
        };
$scope.addCart = function(product,productId,quantity)
{
    CartService.addProduct(product,productId,quantity);
    $scope.isInCart=true;
    if($scope.quantity == undefined) {
        $scope.quantity = 1;
        $scope.afterAdd = true;
    }
    else {
        $scope.afterAdd = false;
        $scope.afterChange = true;
        if($scope.quantity == 0) {
            $scope.isInCart = false;
            $scope.afterAdd = false;
            $scope.afterChange = false;
        }
    }
};
$scope.goToCategory = function(catId){
    $location.path("/#search/"+catId);
};
$scope.goToFeatures = function(feaId){
    $location.path("/search//"+feaId);
};


    }]);

