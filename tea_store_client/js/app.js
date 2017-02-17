var app = angular.module('TeaStoreApp', ['ngRoute','configuration','httpProviderInterceptor','webStorageModule','checklist-model']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.when('/main',
     {
         controller: 'MainController',
         templateUrl: '/partials/main.html'
     }),
        $routeProvider.when('/cart',
            {
                controller: 'CartController',
                templateUrl: '/partials/cart.html'
            }),
        $routeProvider.when('/about',
            {
                //controller: 'CartController',
                templateUrl: '/partials/about.html'
            }),
        $routeProvider.when('/logout',
            {
                controller: 'LogoutController',
                templateUrl: '/partials/logout.html'
            }),
        $routeProvider.when('/search',
            {
                controller: 'SearchController',
                templateUrl: '/partials/search.html'
            }),
        $routeProvider.when('/search/:categoryId/:featureId',
            {
                controller: 'SearchController',
                templateUrl: '/partials/search.html'
            }),
        $routeProvider.when('/search/:categoryId',
            {
                controller: 'SearchController',
                templateUrl: '/partials/search.html'
            }),
        $routeProvider.when('/search//:featureId',
            {
                controller: 'SearchController',
                templateUrl: '/partials/search.html'
            }),

    $routeProvider.when('/product/:id/:name',
    {
        controller: 'ProductController',
        templateUrl: '/partials/product.html'
    })
    .otherwise(
        {
            redirectTo: '/main/'
        });
}]);
