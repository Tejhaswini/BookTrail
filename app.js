var express = require('express');
var app = express();
var session = require('express-session');
app.set('view engine','ejs');

//Connection to the database : Books 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Books');

//To check if the connection is made
mongoose.connection.once('open',function(){
    console.log('connection has been made');
  });
  
app.use(session({resave: true,secret: 'bookToken',saveUninitialized:true}));
app.use('/assets',express.static('assets'));
var path = require('path');

//The controller logic
let catalogController = require('./controller/catalogController');
let profileController = require('./controller/profileController');

app.use(catalogController);
app.use(profileController);

//run on the port : 8080 
app.listen(8080,function(){
    console.log('app started')
    console.log('listening on port 8080')
});

module.exports = app;
