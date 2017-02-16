
app.directive('productBox', function ($timeout,$location) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            productobj: '=',
            isclickable: '=?',
        },
        link: function (scope, element, attrs) {

            initDirective = function () {

            };
            initDirective();

            scope.openProduct = function(id,name)
            {
                $location.path("/product/"+id+"/"+name);
            }

        },
        templateUrl: "templates/productBox.html"
    }
});
