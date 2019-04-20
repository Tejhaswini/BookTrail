var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//The items defined Schema 
var ItemSchema = new Schema({
  userID : Number,
  itemCode : String,
  itemName : String,
  catalogCategory : String,
  description : String,
  rating : Number,
  imgURL : String
});

var Item = mongoose.model('items',ItemSchema);

//Exported Item to use the model across the framework  
module.exports = Item;
