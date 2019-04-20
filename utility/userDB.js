var Users = require('../models/user');

class userDB {
    constructor() 
    {
    }

//this function will get all the users 
getAllUsers(){
  return new Promise((resolve,request) => {
    Users.find({}).then(data=> {
      console.log(data);
      resolve(data);
    }).catch(err => { return reject(err);
    });
    });
    }
//this function will get the user with specific UserID 
getUser(uID){
    return new Promise((resolve,reject) =>  {
      Users.find({userID:uID}).then(data => {
            resolve(data);
        }).catch(err => {return reject(err);
        });
    });  
  }

}
//export the userDB class to use across the framework 
module.exports = userDB;
