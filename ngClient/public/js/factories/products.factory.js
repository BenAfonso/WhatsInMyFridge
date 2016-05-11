myApp.factory("Products", function($resource,APILINK, Items) {
  var Products = $resource(APILINK+"/api/v2/products/:id", {id: '@id'}, {
      query: { method: 'GET', isArray: true },
      update: { method: 'PUT' }
  });

  // Sets the quantity & max of a product depending on all the items associated
  Products.prototype.setQuantityMaxRatio = function(){
      Items.query({product_id: this.id},function(items){
        var sum = 0;
        var max = 0;
        for (i = 0; i < items.length; i++){
            sum = sum + parseInt(items[i].quantity);
            max = max + parseInt(items[i].max);
            items[i].ratio = parseInt((items[i].quantity / items[i].max)*100);
        }
        this.quantity = sum;
        this.max = max;
      });
    };

  return Products;
});
