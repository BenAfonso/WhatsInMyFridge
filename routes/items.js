var items = {
  getItems: function(req,res) {
    // ADD FILTERS HERE
    // Query for result, store in items
    res.status(200).json(items);
  },

  addItem: function(req,res) {
    // Parse args

    // Query to add an item

    // Send result 201 (created)
    res.status(201).send({
      "status": 201,
      "message": "Item successfully added"
    });
  },

  getItem: function(req,res) {
    // ADD FILTERS HERE
    // Query for result, store in item
    res.status(200).json(item);
  },

  modifyItem: function(req,res) {
    // Parse request

    // Query here

    // Send result 200
    res.status(200).send({
      "status": 200,
      "message": "Item modified successfully"
      // Show item modified
    });
  },

  deleteItem: function(req,res){
    // Parse request
    var id = req.params.id;
    // Query here

    // Send result 200 if deleted
    res.status(200).send({
      "status": 200,
      "message": "Item deleted"
    });
  }





};


module.exports = items;
