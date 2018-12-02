var express = require('express');
var app = express();
var passport = require('passport');

app.get('/', function (request, response) {
   // render the views/loginPage.ejs template file
   response.render('loginPage', {title: 'Boulder Meal Slackerz'})
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
  });

app.get('/registration', function (request, response) {
   // render the views/registration.ejs template
   response.render('registration', {title: 'Register'})
});
module.exports = app;
