function List(idList, listName){
  if (idList){
    this.idList = idList,
    this.listName = listName,
    this.links = [ {
          "rel": "self",
          "href": "/api/v1/list/"+this.idList
    }];
  }


};

module.exports = List;
