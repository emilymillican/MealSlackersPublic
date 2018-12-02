var express = require('express');
var app = express();
var passport = require('passport');

app.get('/', function (request, response) {
   // render the views/index.ejs template file
   response.render('index', {title: 'Lab 9 - Integration using Node.js'})
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/store');
  });

module.exports = app;