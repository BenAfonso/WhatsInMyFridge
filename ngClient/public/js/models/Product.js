myApp.factory("Product", function($resource,APILINK) {
  return $resource("/api/v1/product/:id");
});
