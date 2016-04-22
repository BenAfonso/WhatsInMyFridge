# Database Schema

Users(idUser, username, password, salt)
Items(idItem,#idCategory,itemName,#idUser)
Category(idCategory,categoryName, #idUser)
Lists(idListe, #idUser)
Stocks(#idItem, quantity)
ListItems(#idList,#idItem)
Recipe(idRecipe, recipeName, #idUser)
RecipeItems(#idRecipe, #idItem, quantity)

# API Routes

## User's routes

### Get or add items
GET /api/items
    ?category=
    ?max_results=
    ?list=
    ?recipe=
POST /api/items

### Get or add lists
GET /api/lists
POST /api/lists

### Modify or delete list
PUT /api/list/:id
DELETE /api/list/:id

### Get infos / Modify or Delete an item
GET /api/item/:id (Stock, etc)
PUT /api/item/:id (edit stock, ...)
DELETE /api/item/:id

### Get or add categories
GET /api/categories
POST /api/categories

### Modify or delete a category
PUT /api/categorie/:id
DELETE /api/categorie/:id

### Get or add recipes
GET /api/recipes
POST /api/recipes

### Delete or modify a recipe
PUT /api/recipe/:id
DELETE /api/recipe/:id

### Add items to a recipe
POST /api/recipe/:id


## Admin routes


### Get infos about all users
GET /api/admin/users
