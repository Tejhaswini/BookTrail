var express = require('express');
var router = express.Router();
var itemDb = require('../utility/itemDB');
var userDb = require('../utility/userDB');
var UsersItem = require('../models/userItem');
var UsersProfile = require('../models/userProfile');

var bodyParser = require('body-parser');
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/feedback/:itemCode',function(req,res){
  if(req.session.theUser!=undefined||req.session.theUser!=null)
  {
  var itemCode = req.params.itemCode;
  console.log("The value of item code is"+itemCode);
  var items = req.session.userProfile;
  var readIt,rating;
  for(var i=0;i<items.length;i++)
  {
    if(itemCode==items[i]._item)
    {
      readIt = items[i]._readIt;
      rating = items[i]._rating;
    }
  }
  var item = itemDb.getItem(itemCode);
  var page = {
      title:'Store',
      theUser : req.session.theUser,
      item : item,
      readIt : readIt,
      rating : rating
             }
res.render('feedback', {title: page});
}
else
 {
  var categories = getCategories();
  var itemData = itemDb.getItems();
  var data = {
        title:'Categories',
        categories: categories,
        items: itemData,
        theUser : req.session.theUser
             }
  res.render('categories',{data:data});
  }
});

router.get('/myItems',function(req,res){
   //var user = userDb.userProfile;
   //var userItemData = UsersProfile.getItems();
   var user = userDb.userProfile;
   var userItemData = user.userItems;
    if(req.session.theUser)
    {
      var page = {
          title:'MyItems',
          theUser : req.session.theUser,
          userItemData : req.session.userProfile
      }
        console.log("The session is generated");
        res.render('myItems', {title:page});
    }
    else {
      req.session.theUser = user;
      req.session.userProfile = userItemData;
      console.log(req.session.userProfile);
      var page = {
          title:'MyItems',
          theUser : req.session.theUser,
          userItemData : userItemData
    }
      res.render('myItems', {title:page});
      console.log("The session is not generated");
    }
});

router.get('/signout',function(req,res){
    req.session.destroy(function(err){
        var page = {
            title: 'Home'
        }
        res.render('index',{title:page});
    });
});


router.post('/delete',urlencodedParser,function(req,res)
{
    var itemCode = req.body.itemCode;
    console.log("Check the itemCode of deleted item");
    console.log(itemCode);
    var removedData;
    removedData = UsersProfile.removeItem(req.session.userProfile,itemCode);
    console.log("The removed Data");
    console.log(removedData);
    req.session.userProfile = removedData;
    var page = {
      title :'Delete',
      theUser : req.session.theUser,
      userItemData : req.session.userProfile
    }
    res.render('myItems', {title:page});
  });

  router.post('/save',urlencodedParser,function(req,res)
  {
      if(req.session.theUser!=undefined)
      {
      var itemCode = req.body.itemCode;
      var addData;
      addData = UsersProfile.addItem(req.session.userProfile,itemCode);
      req.session.userProfile = addData;
      var page = {
        title :'Save',
        theUser : req.session.theUser,
        userItemData : req.session.userProfile
      }
      res.render('myItems', {title:page});
    }
     else {
      var categories = getCategories();
      var itemData = itemDb.getItems();
      var data = {
            title:'Categories',
            categories: categories,
            items: itemData,
            theUser : req.session.theUser
                 }
      res.render('categories',{data:data});
    }
    });

router.post('/rateit',urlencodedParser,function(req,res)
{
  var itemCode = req.body.itemCode;
  var userRating = req.body.itemRating;
  var userReadIt = req.body.readIt;
  rateVale = UsersProfile.updateItem(req.session.userProfile,itemCode,userRating,userReadIt);
  req.session.userProfile = rateVale;
  var page = {
    title: 'rate',
    theUser : req.session.theUser,
    userItemData : req.session.userProfile
  }
  res.render('myItems',{title:page});
});

var categories = [];
let getCategories = function() {
    // get the category of each item
    var data = itemDb.getItems();
    data.forEach(function(item) {
        if(!categories.includes(item.catalogCategory))
        {
            categories.push(item.catalogCategory);
        }
    });
    return categories;
};
module.exports = router;
