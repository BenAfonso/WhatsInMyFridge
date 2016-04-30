var db = require('../models/db');
var queryBuilder = require('../lib/queryBuilder').queryBuilder;

db.query(query, function(err,item){
  console.log(err);
  if (err)
    errorHandler(err, res);
  else{
      // Send a 201 (created)
      var category = new Category(item[0].idcategory, item[0].categoryname);
      var item = new Item(item[0].iditem, item[0].itemname, category, undefined, undefined, item[0].img);

      res.status(201).send({
        "status": 201,
        "message": "Item added",
        "item": item
      });
  }
});

var Product = {
    // Constructeur
    Product(idProduct, productName, img, Category){
      if (img == null){
        img = undefined;
      }
      this.idProduct = idProduct,
      this.productName = productName,
      this.img = img,
      this.category = Category,
      this.links = [ {
            "rel": "self",
            "href": "/api/v1/product/"+this.idProduct
      }];
    }

    // Methodes
    update: function(fn){
        // Update

    }

    insert: function(){
        // Insert
    }

    delete: function(){
        // Delete
    }



};

module.exports = Product;
