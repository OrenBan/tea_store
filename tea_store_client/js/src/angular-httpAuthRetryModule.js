// httpAuthRetryModule module. ver 1.2

// This module provides a method for handling retry $http call in case of invalid key.
// The 'httpAuthRetryModule' builds a new deffered which refers to the original request, 
// getting new key and make new http call with the original request.
// The only method it has, 'retryHttpRequest' gets original request as an input and return promise. 
// The promise allow handling the request in a same way as the original request.

angular.module('httpAuthRetryModule', ['ngResource'])
    // a function to handle invalid key.
    .factory('httpAuthRetry', function ($q, $injector) {

        function retryRequest(config, deferred, userKey) {           
            config.data.key = userKey;

            function successCallback(response) {
                retryCounter = 0;
                deferred.resolve(response);
            }
            function errorCallback(rejection) {
                deferred.reject(rejection);
            }

            $http = $injector.get('$http');
            $http(config).then(successCallback, errorCallback);
        }

        return {
            retryHttpRequest: function (config) {

                if (Utilities && Utilities.ReleaseLoader != undefined) {
                    Utilities.ReleaseLoader();
                }

                var deferred = $q.defer();

                // Get new key
                $.when(AuthGloblaMethods.getKey(true)).done(function (userKey) {
                    // Retry call with new key
                    retryRequest(config, deferred, userKey);
                });

                // return promise whice allow handle the response as the original response.
                return deferred.promise;
            }
        };
    })