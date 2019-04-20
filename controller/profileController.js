var express = require('express');
var router = express.Router();

var itemDb = require('../utility/itemDB');
var userItemDb = require('../utility/userItemDB');
var userDb = require('../utility/userDB');
var usersItem = require('../models/userItem');

var bodyParser = require('body-parser');
var session = require('express-session');

var urlencodedParser = bodyParser.urlencoded({extended: false});


router.get('/feedback/:itemCode', async function(req,res){
  let userItemData = new userItemDb();
  let itemDt = new itemDb();
  var itemCode = req.params.itemCode;
  var item = await itemDt.getItem(itemCode);
  if(req.session.theUser)
  {
  var items = await userItemData.getUserItemCode(itemCode);
  var readIt,rating = 0;
    if(items!=null || items!=undefined)
    {
     var readIt = items.readIt;
     var rating = items.rating;
    }
    else
  {
    var flag = 1;
  }
}

if(items===undefined || req.session.theUser === undefined || req.session.theUser === null || flag === 1)
  {
    let itemDt = new itemDb();
    var itemData = await itemDt.getAllItems();
    var categories = await itemDt.getCategories();
    var data = {
          title:'Categories',
          categories: categories,
          items: itemData,
          theUser : req.session.theUser
               }
  res.render('categories',{data:data});
    }
else
{
let itemDt = new itemDb();
var item = await itemDt.getItem(itemCode);
var page = {
    title:'Store',
    theUser : req.session.theUser,
    item : item,
    readIt : readIt,
    rating : rating
           }
res.render('feedback',{title: page});
}
});

router.get('/myItems', async function(req,res){
   
  let userDt = new userDb();
  let itemDt = new itemDb();
  let userItemDt = new userItemDb();
  var user = await userDt.getUser(101);
  var itemData =  await userItemDt.getUserItems();
  var items = await itemDt.getAllItems();
  var itemName =[];
  var catalogCategory = [];
  for(var i=0;i<items.length;i++)
      {
        itemValue = await itemDt.getItem(items[i].itemCode);
        itemName[i] = itemValue.itemName;
        catalogCategory[i] = itemValue.catalogCategory;
      }
  if(req.session.theUser)
    {
      var page = {
          title:'MyItems',
          theUser : req.session.theUser,
          item : itemData,
          catalogCategory : catalogCategory,
          itemName : itemName
      }
        res.render('myItems',{title:page});
    }
    else {
      req.session.theUser = user;
      req.session.userProfile = itemData;
      var page = {
          title:'MyItems',
          theUser : req.session.theUser,
          userItemData : user,
          item : itemData ,
          catalogCategory : catalogCategory,
          itemName : itemName
                 }
      res.render('myItems', {title:page});
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
router.post('/delete',urlencodedParser,async function(req,res)
{
    var itemCode = req.body.itemCode;
    var removedData;
    let userData = new userItemDb();
    let itemDt = new itemDb();
    removedData = await userData.removeItem(itemCode);
    req.session.userProfile = removedData;
    var itemName = [];
    var catalogCategory = [];
    for(var i =0;i< removedData.length;i++)
    {
      itemData = await itemDt.getItem(removedData[i].item);
      itemName[i] = itemData.itemName;
      catalogCategory[i] = itemData.itemName;
    }
    var page = {
      title :'Delete',
      theUser : req.session.theUser,
      item : req.session.userProfile,
      itemName : itemName,
      catalogCategory : catalogCategory
    }
    res.render('myItems', {title:page});
  });

  router.post('/save',urlencodedParser, async function(req,res)
  {
      if(req.session.theUser!=undefined)
      {
      var itemCode = req.body.itemCode;
      let userItemDt = new userItemDb();
      var addData =  await userItemDt.addItem(itemCode);
      req.session.userProfile = addData;
      var itemDt = new itemDb();
      var itemName =[];
      var catalogCategory = [];
      for(var i =0;i< addData.length;i++)
      {
        itemData = await itemDt.getItem(addData[i].item);
        itemName[i] = itemData.itemName;
        catalogCategory[i] = itemData.itemName;
      }
      var page = {
        title : 'Save',
        theUser : req.session.theUser,
        item : req.session.userProfile,
        itemName : itemName,
        catalogCategory : catalogCategory
      }
      res.render('myItems', {title:page});
    }
     else {
      let itemDt = new itemDb();
      var categories = await itemDt.getCategories();
      var itemData = await itemDt.getAllItems();
      var data = {
            title:'Categories',
            categories: categories,
            items: itemData,
            theUser : req.session.theUser
                 }
      res.render('categories',{data:data});
    }
    });

router.post('/rateit',urlencodedParser, async function(req,res)
{
  var itemCode = req.body.itemCode;
  var userRating = req.body.itemRating;
  var userReadIt = req.body.readIt;
  var userId = req.body.userId;
  let rateDt = new userItemDb();
  var rateVale = await rateDt.updateItem(itemCode,userId,userRating,userReadIt);
  req.session.userProfile = rateVale; 
  var itemDt = new itemDb();
  var itemName = [];
  var catalogCategory = [];
      for(var i =0;i<rateVale.length;i++)
      {
        itemData = await itemDt.getItem(rateVale[i].item);
        itemName[i] = itemData.itemName;
        catalogCategory[i] = itemData.itemName;
      }
  var page = {
    title: 'rate',
    theUser : req.session.theUser,
    item : req.session.userProfile,
    itemName : itemName ,
    catalogCategory : catalogCategory
  }
  res.render('myItems',{title:page});
});

module.exports = router;
