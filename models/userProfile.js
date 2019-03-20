var userDb = require('../utility/userDB');
var itemDb = require('../utility/itemDB');
var userItem = require('../models/userItem');

class userProfile
{
   constructor(userID,userItems)
  {
    this._userID = userID;
    this._userItems = userItems;
  }
    get userID()
    {
        return this._userID;
    }
    set userID(value)
    {
        this._userID = userID;
    }
    get userItems()
    {
          return this._userItems;
    }
    set userItems(value)
    {
          this._userItems = userItems;
    }
};

var removeItem = function(items,itemID){
  for(var i=0;i<items.length;i++)
  {
  if(itemID == items[i]._item)
  {
    items.splice(i,1);
    break;
  }
}
return items;
}

var addItem = function(items,itemID){
var addData = false;
for(var i=0;i<items.length;i++)
{
if(itemID == items[i]._item){
   addData = true;
}
}
if(addData ==true)
{
  return items;
}
else
 {
  var getData =  itemDb.getItem(itemID);
  var itemData = new userItem(itemID,0,0,getData.itemName,getData.catalogCategory,0);
  items.push(itemData);
  console.log(items);
  return items;
 }
}

var emptyProfile = function() {
  delete userDb.userProfile;
}

  var getItems = function(){
  var user = userDb.userProfile;
  var userItemData = user.userItems;
  return userItemData;
}

var updateItem = function(items,itemID,userRating,userReadIt){
    var testRating,readIt;
    for(var j =0;j<items.length;j++)
    {
      if(itemID == items[j]._item)
      {
      testRating = items[j]._rating;
      readIt = items[j]._readIt;
    }
   }
    if(testRating == userRating && userReadIt==readIt)
    {
     return items;
    }
    else if(testRating != userRating || readIt != userReadIt)
    {
      for(var i =0;i<items.length;i++)
      {
        if(itemID == items[i]._item)
        {
        items[i]._rating = userRating;
        items[i]._readIt = userReadIt;
        }
      }
    return items;
  }
}

module.exports = userProfile;
module.exports.removeItem = removeItem;
module.exports.addItem = addItem;
module.exports.updateItem = updateItem;
module.exports.emptyProfile = emptyProfile;
module.exports.getItems = getItems;
