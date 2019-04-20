var express = require('express');
var router = express.Router();
var itemDb = require('../utility/itemDB');
var userDb = require('../utility/userDB');
var userRatingDb = require('../utility/userItemDB');
var item = require('../models/Item');

router.get('/', function(req,res){
    var page = {
        title:'Home',
        theUser : req.session.theUser
    }
res.render('index', {title: page});
});

router.get('/index',function(req,res){
  var page = {
      title:'Home',
      theUser : req.session.theUser
}
  res.render('index',{title: page});
});

router.get('/categories/item/:itemCode', async function(req,res)
 {
    var itemCode = req.params.itemCode;
    let itemDt = new itemDb();
    var item = await itemDt.getItem(itemCode);
    if(item === undefined || item === null)
    {
      var itemData = await itemDt.getAllItems();
      var categories = await itemDt.getCategories();
      var data =  {
          title:'Categories',
          categories: categories,
          items: itemData,
          theUser : req.session.theUser,
          itCode : itemCode
                  }
    res.render('categories',{data:data});
    }
  else
    {
       var userCode = 0;
       if(req.session.theUser)
       {
          let userDt = new userRatingDb();
          var userData = await userDt.getUserItemCode(itemCode); 
          if(userData!=null && userData.item == itemCode)
          {
              userCode = 1;
          }
       }   
     var data = {
         title:'Item',
         item: item,
         theUser : req.session.theUser,
         userCode : userCode
                }
    res.render('item',{data: data});
  }
});

router.get('/categories/:categoryName', async function(req,res) {
    // get the category name
    var categories = [];
    categories.push(req.params.categoryName);
    let itemDt = new itemDb();
    var itemData = await itemDt.getAllItems();
    var data = {
        title:'Categories',
        categories: categories,
        items: itemData,
        theUser : req.session.theUser
    }
    res.render('categories',{data:data});
});

router.get('/categories', async function(req, res) {
    let itemDt = new itemDb();
    var categories = await itemDt.getCategories();
    var itemData =  await itemDt.getAllItems();
    var data = {
        title:'Categories',
        categories: categories,
        items: itemData,
        theUser : req.session.theUser
    }
  res.render('categories', {data: data });
});

router.get('/contact', function(req,res) {
    var page = {
        title :'Contact Us',
        theUser : req.session.theUser
    }
    res.render('contact', {title:page});
});

router.get('/about', function(req,res)
{
    var page = {
        title : 'About Us',
        theUser : req.session.theUser
    }
    res.render('about', {title:page});
});

module.exports = router;
