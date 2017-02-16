
app.factory('CartService', ['$log', '$q', '$location', '$routeParams',  'HttpRemoteService',
function ($log, $q, $location, $routeParams,HttpRemoteService) {
    var srv = { };



srv.getAllCart = function(withNoZero){
    var cartJsonStr = localStorage.getItem("cart");
    var cartJson = [];
    var cartToReturn = [];
    if(cartJsonStr != undefined && cartJsonStr != "" && cartJsonStr != null) {
        cartJson = JSON.parse(cartJsonStr);
        if(withNoZero){
            for (i = 0; i < cartJson.length; i++) {
                if(cartJson[i].quantity > 0)
                    cartToReturn.push(cartJson[i]);
            }
        }
        else
            return cartJson;
    }
    else
        cartToReturn = [];
    return cartToReturn;
};
    srv.addProduct = function (product,productId,quantity) {

        var cartJson = srv.getAllCart(true);
        var productIdToSearch = productId;

        if(productIdToSearch == undefined)
            productIdToSearch = product.Id;

        var foundedInCart = undefined;
        if(cartJson.length>0) {
            var foundedInCartArray = Enumerable.From(cartJson)
                .Where(function (x) {
                    return x.product.Id == productIdToSearch
                }).ToArray();
            if(foundedInCartArray != undefined && foundedInCartArray != null && foundedInCartArray.length>0)
                foundedInCart = foundedInCartArray[0];
        }
        if(foundedInCart != undefined && foundedInCart != null)
        {
            if(productId == undefined)
                foundedInCart.quantity +=quantity;
            else
                foundedInCart.quantity =quantity;
        }
        else
        {
            foundedInCart = {'quantity':quantity,product: product};
        }
        var newCart = [];
        newCart.push(foundedInCart);
        var allOthersProducts = [];
        if(productId == undefined)
            allOthersProducts = cartJson;
        else {
            allOthersProducts = Enumerable.From(cartJson)
                .Where(function (x) {
                    return x.product.Id != productIdToSearch
                }).ToArray();
        }
        if(allOthersProducts != undefined && allOthersProducts != null && allOthersProducts.length>0) {
            for (i = 0; i < allOthersProducts.length; i++) {
                newCart.push(allOthersProducts[i]);
            }
        }
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    srv.getProductQuantityCart = function(productId){
    var cartInfo = srv.getAllCart(true);
    if(cartInfo.length == 0)
        return 0;
    else
    {
        var foundedInCartArray = Enumerable.From(cartInfo)
            .Where(function (x) {
                return x.product.Id == productId
            }).ToArray();
        if(foundedInCartArray != undefined && foundedInCartArray != null && foundedInCartArray.length>0)
            return foundedInCartArray[0].quantity;
        else
            return 0;
    }

};
srv.clearAll = function(){
    localStorage.removeItem("cart");
};



    return srv;

}]);