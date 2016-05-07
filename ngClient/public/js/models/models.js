myApp.factory("Products", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/products/:id", {id: '@id'}, {
      query: { method: 'GET', isArray: true },
      update: { method: 'PUT' }
  });
});

myApp.factory("Items", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/items/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: true},
      update: { method: 'PUT' }
  });
});

myApp.factory("Categories", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/categories/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: true}
  });
});

myApp.factory("Recipes", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/recipes/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: true}
  });
});

myApp.factory("Ingredients", function($resource,APILINK) {
  return $resource(APILINK+"/api/v2/recipes/:recipe_id/products/:product_id", {recipe_id: '@recipe_id', product_id: '@product_id'}, {
      query: {method: 'GET', isArray: true}
  });
});
