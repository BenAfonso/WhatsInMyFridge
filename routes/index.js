var express = require('express');
var router = express.Router();

var items = require('./items');
var users = require('./users');
var categories = require('./categories');
var recipes = require('./recipes');
var products = require('./products');


// Todo : Search for // Change HERE in recipe.js

/*
*   Routes that can be accessed only by authenticated users
*/

// Items TODO Security check user_id using product
router.get('/api/v1/items', items.getItems);
router.post('/api/v1/items', items.addItem);
router.get('/api/v1/item/:id', items.getItem);
router.put('/api/v1/item/:id', items.modifyItem);
router.delete('/api/v1/item/:id', items.deleteItem);


// Categories
router.get('/api/v1/categories', categories.getCategories);
router.post('/api/v1/categories', categories.addCategory);
router.put('/api/v1/category/:id', categories.modifyCategory);
router.delete('/api/v1/category/:id', categories.deleteCategory);

// Products

router.get('/api/v1/products', products.getProducts);
router.post('/api/v1/products', products.addProduct);
router.get('/api/v1/product/:id', products.getProduct);
router.put('/api/v1/product/:id', products.modifyProduct);
router.delete('/api/v1/product/:id', products.deleteProduct);


// Recipes
router.get('/api/v1/recipes', recipes.getRecipes);
router.get('/api/v1/recipe/:id', recipes.getRecipe);
router.post('/api/v1/recipes', recipes.addRecipe);
router.put('/api/v1/recipe/:id', recipes.modifyRecipe);
router.post('/api/v1/recipe/:id', recipes.addIngredient);
router.delete('/api/v1/recipe/:id', recipes.deleteRecipe);
router.delete('/api/v1/recipe/:recipe_id/product/:product_id', recipes.deleteIngredient);
router.put('/api/v1/recipe/:recipe_id/product/:product_id', recipes.modifyIngredient);

/*
*   Routes that can be accessed only by authenticated and authorized users
*/

// Users
//router.get('/api/v1/admin/users', users.getUsers);


module.exports = router;
