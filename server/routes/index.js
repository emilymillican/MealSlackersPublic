var express = require('express');
var app = express();
var passport = require('passport');

app.get('/', function (request, response) {
   // render the views/loginPage.ejs template file
   response.render('login/loginPage', {title: 'Boulder Meal Slackerz'})
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
  });

app.get('/registration', function (request, response) {
   // render the views/registration.ejs template
   response.render('login/registration', {title: 'Register'})
});

app.post('/register', function (request, response) {
   // Validate user input - ensure required fields are filled
});

app.get('/recover', function (request, response) {
   // render the views/registration.ejs template
   response.render('login/recover', {title: 'Recover Login'})
});

app.post('/recover', function(request, response) {
   // Validate user input - ensure non emptiness
   request.assert('email', 'email is required').notEmpty();

   var errors = request.validationErrors();
   
   if(!errors) { //No validation errors
      var item = {
         email: request.sanitize('email').escape().trim()
      };
      // Run SQL query to determine username / password
      db.one('')
      .then(function (row) {
         //if email not found
         if (row.length === 0) {
             request.flash('error', 'Email Address not found: '+ request.params.id);
             response.redirect('/recover')
         }
         else {
             response.render('/success', {title:'Success!'})
         }
      })
   }
   else  {
      var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br/>' + current_error.msg,'');
      request.flash('error', error_msg);
      response.render('/recover', {title: 'Recover: Error'})
   }
});



module.exports = app;
