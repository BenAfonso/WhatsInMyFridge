myApp.factory("Items", function($resource,APILINK) {
  var Items = $resource(APILINK+"/api/v2/items/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: true},
      update: { method: 'PUT' }
  });

  Items.prototype.getProduct = function(){
    Products.get({id: this.product.idProduct}, function(product){
      return product;
    });
  };
  Items.prototype.setRatio = function(){
    this.ratio = parseInt((this.quantity / this.max)*100);
  };
  return Items;
});
