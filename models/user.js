var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//The user defined schema .. 
var UserSchema = new Schema({
    userID : Number,
    firstName : String,
    lastName : String,
    emailAdress : String,
    addressLine1  : String,
    addressLine2  : String,
    city : String,
    state : String,
    zipCode: String,
    country : String
});
var Users = mongoose.model('users',UserSchema);

//Exported Users to use the model across the framework  
module.exports = Users;
