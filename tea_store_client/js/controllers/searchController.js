
app.controller('SearchController', ['$scope', '$http', '$log', '$q', '$timeout', '$routeParams', '$location', 'MainService',
    function ($scope, $http, $log, $q, $timeout, $routeParams, $location, MainService) {
        $scope.foundedProducts=[];
        $scope.filter = {
            FromPrice:undefined,
            ToPrice:undefined,
            Name:'',
            IsInSale:0,
            CategoryId:undefined,
            ProductFeaturesArray:[]
        };
        $scope.init = function(){

            document.title = "Tea Store";

            //var featuresIds = Enumerable.From($scope.generalParameters.baseData.features).select(function (x) { return x.Id }).ToArray();
            $scope.featuresIds = {ids:[]};

            $scope.initMaster().then(function(masterLoaded){
                $scope.categoryIdParam = $routeParams.categoryId;
                $scope.featureIdParam = $routeParams.featureId;
                if($scope.categoryIdParam != null && $scope.categoryIdParam != undefined && String(Math.floor(Number($scope.categoryIdParam))) === $scope.categoryIdParam && Math.floor(Number($scope.categoryIdParam)) >= 0)
                    $scope.filter.CategoryId =  parseInt($scope.categoryIdParam);

                if($scope.featureIdParam != null && $scope.featureIdParam != undefined && String(Math.floor(Number($scope.featureIdParam))) === $scope.featureIdParam && Math.floor(Number($scope.featureIdParam)) >= 0)
                    $scope.filter.ProductFeaturesArray.push(parseInt($scope.featureIdParam));
                $scope.searchProducts();
            });
        };

        $scope.searchProducts = function(){

            MainService.searchProducts($scope.filter).then(function(result){
                $scope.foundedProducts = result;
            });
        };
    }]);

