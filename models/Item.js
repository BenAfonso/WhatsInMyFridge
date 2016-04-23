function Item(idItem, itemName, Category, quantity){
  if (quantity == null){
    quantity = undefined;
  }
  this.idItem = idItem,
  this.itemName = itemName,
  this.quantity = quantity,
  this.Category = Category
  this.links = [ {
        "rel": "self",
        "href": "/api/v1/item/"+this.idItem
  }];

};

module.exports = Item;
