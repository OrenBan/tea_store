var app = angular.module('TeaStoreApp', ['ngRoute','configuration','httpProviderInterceptor','webStorageModule','checklist-model']);

app.config(['$routeProvider', 'BASE_DIRECTORY',
function ($routeProvider, BASE_DIRECTORY) { //


    $routeProvider.when('/main',
     {
         controller: 'MainController',
         templateUrl: BASE_DIRECTORY + '/partials/main.html'
     }),
        $routeProvider.when('/cart',
            {
                controller: 'CartController',
                templateUrl: BASE_DIRECTORY + '/partials/cart.html'
            }),
        $routeProvider.when('/about',
            {
                //controller: 'CartController',
                templateUrl: BASE_DIRECTORY + '/partials/about.html'
            }),
        $routeProvider.when('/logout',
            {
                controller: 'LogoutController',
                templateUrl: BASE_DIRECTORY + '/partials/logout.html'
            }),
        $routeProvider.when('/search',
            {
                controller: 'SearchController',
                templateUrl: BASE_DIRECTORY + '/partials/search.html'
            }),
        $routeProvider.when('/search/:categoryId/:featureId',
            {
                controller: 'SearchController',
                templateUrl: BASE_DIRECTORY + '/partials/search.html'
            }),
        $routeProvider.when('/search/:categoryId',
            {
                controller: 'SearchController',
                templateUrl: BASE_DIRECTORY + '/partials/search.html'
            }),
        $routeProvider.when('/search//:featureId',
            {
                controller: 'SearchController',
                templateUrl: BASE_DIRECTORY + '/partials/search.html'
            }),

    $routeProvider.when('/product/:id/:name',
    {
        controller: 'ProductController',
        templateUrl: BASE_DIRECTORY + '/partials/product.html'
    })
    .otherwise(
        {
            redirectTo: '/main/'
        });
}]);