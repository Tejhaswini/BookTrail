var express = require('express');
var app = express();
var session = require('express-session');
app.set('view engine','ejs');

app.use(session({resave: true,secret: 'bookToken', saveUninitialized:true}));
app.use('/assets',express.static('assets'));
var path = require('path');
let catalogController = require('./controller/catalogController');
let profileController = require('./controller/profileController');
//  routes defining

app.use(catalogController);
app.use(profileController);
app.listen(8080,function(){
    console.log('app started')
    console.log('listening on port 8080')
});
module.exports = app;
