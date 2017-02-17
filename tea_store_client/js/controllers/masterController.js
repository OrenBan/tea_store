
app.controller('MasterController', ['$scope', '$http', '$location', '$window', '$route', '$routeParams', '$q','webStorage', 'MainService',
function ($scope, $http, $location, $window, $route, $routeParams,$q,webStorage,  MainService) {

$scope.generalParameters = {
    baseData:undefined,
    title:""
};

$scope.initMaster = function(){
    var deferred = $q.defer();

if($scope.generalParameters.baseData == undefined)
{
    $scope.getBaseData().then(function (result) {
        $scope.generalParameters.baseData = result;
    }).then(function () {
        deferred.resolve(true);
    });
}
else
{
    deferred.resolve(true);
}


    return deferred.promise;
};

$scope.getBaseData = function(){
    var deferred = $q.defer();
    var baseDataObj = webStorage.session.get('base_data');
    if(baseDataObj == undefined || baseDataObj == null) {
        MainService.getBaseData().then(function (result) {

            var baseDataJson = JSON.stringify(result);
            sessionStorage.setItem('base_data', baseDataJson);
            deferred.resolve(result);
        });
    }
    else
    {
        //var baseDataParsedObj = JSON.parse(baseDataObj);
        deferred.resolve(baseDataObj);
    }
    return deferred.promise;
};
$scope.goToCategory = function(id)
{
    $location.path("/search/"+id+"/");
};
$scope.goToFeature = function(id)
{
    $location.path("/search//"+id);
};





}]);
