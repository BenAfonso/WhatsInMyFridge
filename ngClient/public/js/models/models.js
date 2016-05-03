myApp.factory("Product", function($resource,APILINK) {
  return $resource(APILINK+"/api/v1/products/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: false}
  });
});

myApp.factory("Item", function($resource,APILINK) {
  return $resource(APILINK+"/api/v1/items/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: false}
  });
});

myApp.factory("Category", function($resource,APILINK) {
  return $resource(APILINK+"/api/v1/categories/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: false}
  });
});

myApp.factory("Recipe", function($resource,APILINK) {
  return $resource(APILINK+"/api/v1/recipes/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: false}
  });
});

myApp.factory("Ingredient", function($resource,APILINK) {
  return $resource(APILINK+"/api/v1/recipes/:recipe_id/products/:product_id", {recipe_id: '@recipe_id', product_id: '@product_id'}, {
      query: {method: 'GET', isArray: false}
  });
});
