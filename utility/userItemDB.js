var UsersItem = require('../models/userItem');
var itemDB = require('../utility/itemDB');
var userItDb  = require('../utility/userItemDB');
class userItemDB 
{
    constructor()
    {

    }
//this function will get the user items which are displayed under MyItems tab
getUserItems(){
        return new Promise((resolve,reject) => {
          UsersItem.find().then(data => {
            resolve(data);
            }).catch(err => {return reject(err);
            });
        });  
}

//this function is to delete the item from the UI and DB 
removeItem(itemCode){
  return new Promise((resolve,reject) => {
    UsersItem.deleteOne({item:itemCode},function(err) {
      if(err) return console.log(err);
      UsersItem.find().then(data => {
      resolve(data);
    }).catch(err => {
      return reject(err);
    });

    });
  });
    }
//this function is to add the item to the My Items and DB 
async addItem(itemCode) {
      let itemData = new itemDB();
      var itemDt = await itemData.getItem(itemCode);
      return new Promise((resolve,reject) => {
        UsersItem.update({userID:itemDt.userID,item:itemCode},{$setOnInsert:{rating:0,readIt :0,itemName:itemDt.itemName,catalogCategory:itemDt.catalogCategory}},{upsert:true},function(err) {
          if(err) return console.log(err);
          UsersItem.find().then(data => {
          resolve(data);
        }).catch(err => {
          return reject(err);
        });
    
        });
      });
        }

        //this function  is to get the user item based on the User itemCode
getUserItemCode(itemCode){
          return new Promise((resolve,reject) =>  {
            UsersItem.findOne({item:itemCode}).then(data => {
              resolve(data);
              }).catch(err => {return reject(err);
              });
          });  
        }

    //this function is to find and update the rating   
addItemRating(itemID,userID,rating){
          return new Promise((resolve,reject) =>{
              UsersItem.findOneAndUpdate({item:itemID},
                  {$set:{rating:rating}},(err) => {
                  if (err) return console.error(err);
                  UsersItem.find().then( data => {
                  resolve(data);
                  }).catch(err => {
                  return reject(err);
                  });
    
              });  
    
            });
      }

    //this function is to find and update the rating 
addReadIt(itemID,userID,readIt){ 
          return new Promise((resolve,reject) =>{
              UsersItem.findOneAndUpdate({item:itemID},
                  {$set:{readIt:readIt}},(err) => {
                  if (err) return console.error(err);
                  UsersItem.find().then( data => {
                  resolve(data);
                  }).catch(err => {
                  return reject(err);
                  });
    
              });  
    
            });   
      }

      //this function is to update the user item 
async updateItem(itemCode,userID ,rating,readIt){
          var getUserData = await this.getUserItemCode(itemCode);
          var dbRating,dbReadIt,items;
          dbRating =  getUserData.rating;
          dbReadIt = getUserData.readIt;
          if(dbRating != rating && dbReadIt != readIt){
            items = await this.addItemRating(itemCode,userID,rating)
            items = await this.addReadIt(itemCode,userID,readIt) 
          }
          else if(dbRating!= rating)
          {
            items = await this.addItemRating(itemCode,userID,rating)
          }
          else if(dbReadIt!= readIt)
          {
            items = await this.addReadIt(itemCode,userID,readIt) 
          }
          return items;
  }
 
}
//export the userItemDB class to use across the framework 
module.exports = userItemDB;
