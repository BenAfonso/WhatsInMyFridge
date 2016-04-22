var lists = {
  getLists: function(req,res) {
    // Query for result, store in recipes
    res.status(200).json(lists);
  },

  addList: function(req,res) {
    // Parse args

    // Query to add a recipe

    // Send result 201 (created)
    res.status(201).send({
      "status": 201,
      "message": "List successfully added"
    });
  },

  modifyList: function(req, res) {
    // Parse args
    // Query to add a recipe
    // Send result 200
    res.status(200).send({
      "status": 200,
      "message": "List modified"
    });
  },

  deleteList: function(req, res){
    // Parse request
    var listId = req.params.id;
    // Check if it's user's recipe !
    //
    // Query to delete recipe
    //
    // Send result 200
    res.status(200).send({
      "status": 200,
      "message": "Recipe deleted"
    });
  },

  addItem: function(req,res){
    // Parse request
    var listId = req.params.id;
    // Query to add given item in recipe
    //
    // Send result 201 (created)
    res.status(201).send({
      "status": 201,
      "message": "Item added to list"
    });
  },

  deleteItem: function(req,res){
    // Parse request
    var listeId = req.params.list_id;
    var itemId = req.params.item_id;
    // Query to remove item from recipe
    //
    // Send result
    res.status(200).send({
      "status": 200,
      "message": "Item deleted from list"
    });
  }




};


module.exports = lists;
