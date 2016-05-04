myApp.factory("Product", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/products/:id", {id: '@id'}, {
      query: { method: 'GET', isArray: true },
      update: { method: 'PUT' }
  });
});

myApp.factory("Item", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/items/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: false}
  });
});

myApp.factory("Category", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/categories/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: false}
  });
});

myApp.factory("Recipe", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/recipes/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: false}
  });
});

myApp.factory("Ingredient", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/recipes/:recipe_id/products/:product_id", {recipe_id: '@recipe_id', product_id: '@product_id'}, {
      query: {method: 'GET', isArray: false}
  });
});
