
angular.module('httpProviderInterceptor', ['ngResource', 'httpAuthRetryModule'])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('MainHttpInterceptor');
    }]).
  factory('MainHttpInterceptor', function ($q, $injector, httpAuthRetry) {


      return {

          'request': function (config) {
              // Allow to disable loader in case of native app loader.
              var loading = GetLoaderState(config);

              


              if (loading) {
                  var allowLoader = true;

                  //Exclude function or something from load
                  if (allowLoader)
                      Utilities.SetLoader();
              }

              var deferred = $q.defer();

              if (config.method == "POST" && config.data && config.data.hasOwnProperty("key") && (config.data.key == "" || config.data.key == "notRequired")) {

                  var notRequired = false;

                  if (config.data.key == "notRequired") {
                      config.data.key = null;
                      notRequired = true;
                  }

                  GetKeyAndSend(config, deferred, false, notRequired);
              }
              else {
                  deferred.resolve(config)
              }

              return deferred.promise;
          },

          'response': function (response) {


                  Utilities.ReleaseLoader();

              

              return $q.when(response);
          },

          'responseError': function (rejection) {
              Utilities.ReleaseLoader();

              try {
                  alert('Please Try Later, check server.');
              } catch (e) {
                  alert('Server Error');
              }

              return $q.reject(rejection);
          }
      };
  });


function GetLoaderState(config) {
    if (config && config.data && config.data.loader != undefined && !config.data.loader) {
        return false;
    }

    return true;
}
