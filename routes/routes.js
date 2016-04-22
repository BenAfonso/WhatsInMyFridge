var express = require('express');
var router = express.Router();

var auth = require('./auth');
var items = require('./items');
var lists = require('./lists');
var users = require('./users');
var categories = require('./categories');
var recipes = require('./recipes')




/*
*   Routes that can be accessed by any one
*/
router.post('/login', auth.login);
router.post('/register', auth.createUser);

/*
*   Routes that can be accessed only by authenticated users
*/

// Items
router.get('/api/v1/items', items.getItems);
router.post('/api/v1/items', items.addItem);
router.get('/api/v1/item/:id', items.getItem);
router.put('/api/v1/item/:id', items.modifyItem);
router.delete('/api/v1/item/:id', items.deleteItem);

// Lists
router.get('/api/v1/lists', lists.getLists);
router.post('/api/v1/lists', lists.addList);
router.put('/api/v1/list/:id', lists.modifyList);
router.delete('/api/v1/list/:id', lists.deleteList);
router.post('/api/v1/list/:id', lists.addItem);
router.delete('/api/v1/list/:list_id/item/:item_id', lists.deleteItem);

// Categories
router.get('/api/v1/categories', categories.getCategories);
router.post('/api/v1/categories', categories.addCategory);
router.put('/api/v1/categorie/:id', categories.modifyCategory);
router.delete('/api/v1/categorie/:id', categories.deleteCategory);

// Recipes
router.get('/api/v1/recipes', recipes.getRecipes);
router.post('/api/v1/recipes', recipes.addRecipe);
router.post('/api/v1/recipe/:id', recipes.addItemToRecipe);
router.delete('/api/v1/recipe/:id', recipes.deleteRecipe);
router.delete('/api/v1/recipe/:recipe_id/item/:item_id', recipes.deleteItemInRecipe);
router.put('/api/v1/recipe/:recipe_id/item/:item_id', recipes.modifyItemInRecipe);

/*
*   Routes that can be accessed only by authenticated and authorized users
*/

// Users
router.get('/api/v1/admin/users', users.getUsers);


module.exports = router;
