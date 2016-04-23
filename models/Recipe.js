function Recipe(idRecipe, recipeName){
  this.idRecipe = idRecipe,
  this.recipeName = recipeName,
  this.links = [ {
        "rel": "self",
        "href": "/api/v1/recipe/"+this.idRecipe
  }];

};

module.exports = Recipe;
