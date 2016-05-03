myApp.factory("Product", function($resource,APILINK) {
  return $resource("http://localhost:3000/api/v1/products/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: false}
  });
});
