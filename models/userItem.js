var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/Books');

//The user item defined schema .. 
var UserItemSchema = new Schema({
    userID : Number,
    item : String,
    rating : Number,
    readIt : Number
});

var UsersItem = mongoose.model('userratings',UserItemSchema);

//Exported the UsersItem to use the model across the framework  
module.exports = UsersItem;