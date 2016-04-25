function Category(idCategory, categoryName){
  if (idCategory == null)
    idCategory = undefined;
  if (categoryName == null)
    categoryName = undefined;
  this.idCategory = idCategory,
  this.categoryName = categoryName
};

module.exports = Category;
