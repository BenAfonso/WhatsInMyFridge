myApp.factory('ProductsFactory', function(APILINK, $http) {
  var _ProductsFactory = {}

  // Add sorting functions to getProducts
  _ProductsFactory.getProducts = function() {
      var promise = $http.get(APILINK+'/api/v1/products').then(function(response){
        return (response.data);
    }, function(error){
        console.log(error);
    })
    return promise;
    };

  _ProductsFactory.getProduct = function(id) {
    return $http.get(APILINK+'/api/v1/product/'+id).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    })
    return promise;
    };

  _ProductsFactory.modifyProduct = function(product) {

    var promise = $http.put(APILINK+'/api/v1/product/'+product.idProduct, {
      productName: product.productName,
      img: product.img,
      idCategory: Product.idCategory
    }).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    })
    return promise;
    };


  _ProductsFactory.deleteProduct = function(product) {
      var promise = $http.delete(APILINK+'/api/v1/products/'+product.idProduct).then(function(response){
          return (response.data);
      }, function(error){ // An error occured
          console.log(error);
      })
      return promise;
      };

  _ProductsFactory.addProduct = function(productName, img){

    var promise = $http.post(APILINK+'/api/v1/products', {
        productName: productName,
        img: img,
        idCategory: idCategory
    }).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    })
    return promise;
    };

  return _ProductsFactory;

});
