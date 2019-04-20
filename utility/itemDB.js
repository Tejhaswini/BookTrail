var db =  require('../models/Item');

class ItemDB {
    constructor() {
    }

//this function is to get all the items
getAllItems(){
return new Promise((resolve,request) => {
  db.find({}).then(data=> {
    console.log(data);
    resolve(data);
  }).catch(err => {return reject(err);
  });
  });
  }

//this function will fetch only the item based on the specific itemCode
getItem(id){
    return new Promise((resolve,reject) =>  {
        var itemData;
        itemData = db.findOne({itemCode:id});
        itemData.then(data => {
            resolve(data);
        }).catch(err => {
      return reject(err);
        });
    });
  }  

  //this function will fetch all the available categories 

   async getCategories() {
    var categories = [];
    // get the category of each item
    var data = await this.getAllItems();
    data.forEach(function(item) {
        if(!categories.includes(item.catalogCategory))
        {
            categories.push(item.catalogCategory);
        }
    });
    return categories;
   }

  }
//export the ItemDB class to use across the framework 
  module.exports = ItemDB;