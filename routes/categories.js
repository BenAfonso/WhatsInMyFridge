var categories = {
  getCategories: function(req,res) {
    // ADD FILTERS HERE
    // Query for result, store in categories
    res.status(200).json(categories);
  },

  addCategory: function(req,res) {
    // Parse args

    // Query to add a category

    // Send result 201 (created)
    res.status(201).send({
      "status": 201,
      "message": "Category successfully added"
    });
  },


  modifyCategory: function(req,res) {
    // Parse request
    var id = req.params.id;
    // Query here

    // Send result 200
    res.status(200).send({
      "status": 200,
      "message": "Category modified successfully"
      // Show item modified
    });
  },

  deleteCategory: function(req,res){
    // Parse request
    var id = req.params.id;
    // Query here

    // Send result 200 if deleted
    res.status(200).send({
      "status": 200,
      "message": "Category deleted"
    });
  }





};


module.exports = categories;
