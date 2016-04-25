function Item(idItem, itemName, Category, quantity, list, img){
  if (quantity == null){
    quantity = undefined;
  }
  if (img == null){
    img = undefined;
  }
  this.idItem = idItem,
  this.itemName = itemName,
  this.img = img;
  this.quantity = quantity,
  this.category = Category,
  this.list = list;
  this.links = [ {
        "rel": "self",
        "href": "/api/v1/item/"+this.idItem
  }];

};

module.exports = Item;
