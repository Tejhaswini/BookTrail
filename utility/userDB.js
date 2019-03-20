var Users = require('../models/user');
var UsersItem = require('../models/userItem');
var UsersProfile = require('../models/userProfile');

var getUsers = function() {
    let users = [];
    for(let i = 0; i<userData.length; i++)
    {
        let user = new Users(userData[i].userID,
            userData[i].firstName,
            userData[i].lastName,
            userData[i].emailAddress,
            userData[i].address1Field,
            userData[i].address2Field,
            userData[i].city,
            userData[i].state,
            userData[i].zipCode,
            userData[i].country);
            users.push(user);
    }
    return users;
};

var getUser = function(userID)
 {
   console.info("from JSON, UserId :" + userID);
   for(var i = 0; i < userData.length;i++)
   {
       if((userData[i].userID) == userID)
       {
           console.log("get into if condition");
           let user = new Users(userData[i].userID,
               userData[i].firstName,
               userData[i].lastName,
               userData[i].emailAddress,
               userData[i].address1Field,
               userData[i].address2Field,
               userData[i].city,
               userData[i].state,
               userData[i].zipCode,
               userData[i].country);
           console.log("Item"+JSON.stringify(user));
           return user;
       }
   }
};

var getUserItem = function(item)
 {
   console.info("from JSON, UserId :" + item);
   for(var i = 0; i < userItemData.length;i++)
   {
       if((userItemData[i].item) == item)
       {
           console.log("get into if condition");
           let userItem = new UsersItem(userItemData[i].item,
               userItemData[i].rating,
               userItemData[i].madeIt,
               userItemData[i].category,
               userItemData[i].catalogCategory,
               userItemData[i].readIt
             );
           console.log("Item"+JSON.stringify(userItem));
           return userItem;
       }
   }
};

var userData = [
    {
      userID: 101,
      firstName: "Tejaswini",
      lastName: "Atluri",
      emailAddress : "tatluri@uncc.edu",
      address1Field : "9505 University Terrace",
      address2Field : "Apartment L",
      city : "Charlotte",
      state : "North carolina",
      zipCode : 28262,
      country : "USA"
    },
    {
    userID: 102,
    firstName: "Anusha",
    lastName: "Mulpuri",
    emailAddress : "amulpuri@uncc.edu",
    address1Field : "9501 University Terrace",
    address2Field : "Apartment M",
    city : "Charlotte",
    state : "North Carolina",
    zipCode : 28262,
    country : "USA"
    }

];
var userItemData = [
    {
      item: "Bk01",
      rating: 3,
      madeIt: false,
      category : "Stephen Hawking -A life in Science",
      catalogCategory :"Sci-Fi & Fantasy",
      readIt : 1
    },
    {
    item: "Bk02",
    rating: 4,
    madeIt: true,
    category : "The Ragged Edge of Night",
    catalogCategory : "Sci-Fi & Fantasy",
    readIt : 0
  },
  {
    item: "Bk04",
    rating: 3,
    madeIt: true,
    category : "Zero Sugar CookBook",
    catalogCategory : "Health & Fitness",
    readIt : 0
  }
];

//calling the user items objects over here
var user1 = new getUser(101);
var user2 = new getUser(102);
var userItem1 = new getUserItem("Bk01");
var userItem2 = new getUserItem("Bk02");
var userItem3 = new getUserItem("Bk04");

//passing the user item object for user 1
var userItems = [userItem1,userItem2,userItem3];
var userProfile = new UsersProfile(userData[0].userID,userItems);

module.exports.getUser = getUser;
module.exports.getUserItem = getUserItem;
module.exports.userProfile = userProfile;
module.exports.userItems = userItems;
module.exports.userItem1 = userItem1;
module.exports.userItem2 = userItem2;
module.exports.userItem3 = userItem3;
module.exports.user1 = user1;
module.exports.user2 = user2;
module.exports.userItemData = userItemData;
