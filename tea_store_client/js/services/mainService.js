
app.factory('MainService', ['$log', '$q', '$location', '$routeParams',  'HttpRemoteService',
function ($log, $q, $location, $routeParams,HttpRemoteService) {
    var srv = { };




    srv.logout = function () {
        //Clear Sesion Store

        document.location.href = "/#/home";
    }

    srv.getBaseData = function () {
        var deferred = $q.defer();

        var promise = HttpRemoteService.get('system-configuration');
        promise.then(function (result) {
            deferred.resolve(result);

        }, function (reason) {
            $log.warn(reason);

            deferred.reject(reason);
        }).then(function () {

        });
        return deferred.promise;
    };
    srv.getProduct = function (id) {
        var deferred = $q.defer();
        var routeName = 'product';
        routeName = routeName+'/'+id;
        var promise = HttpRemoteService.get(routeName);
        promise.then(function (result) {
            deferred.resolve(result);

        }, function (reason) {
            $log.warn(reason);

            deferred.reject(reason);
        }).then(function () {

        });
        return deferred.promise;
    };
    srv.getProducts = function () {
        var deferred = $q.defer();
        var routeName = 'product';

        var promise = HttpRemoteService.get(routeName);
        promise.then(function (result) {
            deferred.resolve(result);

        }, function (reason) {
            $log.warn(reason);

            deferred.reject(reason);
        }).then(function () {

        });
        return deferred.promise;
    };
    srv.searchProducts = function (filter) {
        var deferred = $q.defer();
        var routeName = 'product_search';

        var promise = HttpRemoteService.post(routeName,filter);
        promise.then(function (result) {
            deferred.resolve(result);

        }, function (reason) {
            $log.warn(reason);

            deferred.reject(reason);
        }).then(function () {

        });
        return deferred.promise;
    };


    return srv;

}]);