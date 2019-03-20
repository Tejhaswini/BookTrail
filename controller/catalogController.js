
var express = require('express');
var router = express.Router();
var itemDb = require('../utility/itemDB');
var userDb = require('../utility/userDB');

router.get('/', function(req,res){
    var page = {
        title:'Home',
        theUser : req.session.theUser
    }
    console.log("session check");
    console.log(page.theUser);
res.render('index', {title: page});
});

router.get('/index',function(req,res){
  var page = {
      title:'Home',
      theUser : req.session.theUser
}
  res.render('index',{title: page});
});


router.get('/categories',function(req, res) {
    var categories = getCategories();
    var itemData = itemDb.getItems();
    var data = {
        title:'Categories',
        categories: categories,
        items: itemData,
        theUser : req.session.theUser
    }
  res.render('categories', {data: data });
});
router.get('/categories/:categoryName', function (req,res) {
    // get the category name
    var categories = [];
    categories.push(req.params.categoryName);
    var itemData = itemDb.getItems();
    var data = {
        title:'Categories',
        categories: categories,
        items: itemData,
        theUser : req.session.theUser
    }
    res.render('categories', {data: data});
});

router.get('/categories/item/:itemCode',function(req,res)
 {
    var itemCode = req.params.itemCode;
    console.log("Hey Item Code:"+ itemCode);
    var itemData = itemDb.getItems();
    var categories = getCategories();
    var item = itemDb.getItem(itemCode);
    if(item === undefined)
    {
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
     var data = {
         title:'Item',
         item: item,
         theUser : req.session.theUser,
         item : item
     }
    res.render('item',{data: data});
  }
});
router.get('/contact', function(req,res) {
    var page= {
        title:'Contact Us',
        theUser : req.session.theUser
    }
    res.render('contact', {title:page});
});
router.get('/about', function(req,res)
{
    var page= {
        title:'About Us',
        theUser : req.session.theUser
    }
    res.render('about', {title:page});
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
