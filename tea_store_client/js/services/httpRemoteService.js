"use strict";
app.service('HttpRemoteService', ['$http', '$log', '$q', 'API_DIRECTORY',
    function ($http, $log, $q, API_DIRECTORY, TOKEN_NAME) {

        this.get = function (apiName, action, paramObject) {
            var headerValues = {};

            var url = '';
            if (action)
                url = API_DIRECTORY + '/' + apiName + '/' + action;
            else
                url = API_DIRECTORY + '/' + apiName;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                params: paramObject,
                headers: headerValues,
                contentType: "application/json; charset=utf-8",
            }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    $log.warn(data, status, headers, config);
                    deferred.reject(status);
                });
            return deferred.promise;
        };



        var transform = function (data) {
            return $.param(data);
        };


        this.post = function (apiName,newItem) {
            var headerValues = { 'Content-Type': 'application/json;charset=UTF-8' };

            var url = API_DIRECTORY + '/' + apiName;
            var deferred = $q.defer();

            $http.post(url, newItem).then(function(response){
                deferred.resolve(response.data);
                }, function(errRes)
                {
                    alert("failed");
                }
            );

            return deferred.promise;
        };




    }]);
