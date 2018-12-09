var express = require('express');
var app = express();
var passport = require('passport');
var db = require('../database');
var decode = require('decode-html');
var encode = require('encode-html');

app.get('/', function (request, response) {
   // render the views/loginPage.ejs template file
   response.render('login/loginPage', {
      title: 'Boulder Meal Slackerz',
      username: ''
   })
});

app.post('/login', 
  passport.authenticate('local', { failureFlash: 'Invalid Email / Password',failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
  });

app.get('/registration', function (request, response) {
   // render the views/registration.ejs template
   response.render('login/registration', {
      title: 'Register',
      Name: '',
      email: '',
      Password1: '',
      Password2: '',
      Major: '',
      Description: "Hi! I'm at CU Boulder!",
      Month: "Spring",
      Year: "2018",
      Profilephoto: "https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png"
   })
});

//TODO: Return error messages for the password check and e-mail checks and go back to page without losing info
app.post('/register', function (request, response) {
   //Check which values need to be included/ match requirementsi
   var unique = true;
   request.body.Profilephoto = "https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png";
   if (request.body.Password1 != request.body.Password2){
       request.body.Password2 = null;
   }
   db.none('SELECT UserEmail FROM UserTable WHERE UserEmail = $1',[request.body.email])
       .then(function() {
	   request.assert('Name', 'Name is required').notEmpty();
	   request.assert('email', 'Invalid Email').notEmpty();
	   request.assert('email', 'Not a valid email address').isEmail();
	   request.assert('Password1', 'password is required').notEmpty();
	   request.assert('Password2', "Passwords don't match").notEmpty();
	   request.assert('Major', 'major is required').notEmpty();
	   //request.assert('Profilephoto', 'Ensure you have a profile picture url').isURL();
	   request.assert('Hometown', 'Hometown is required').notEmpty();
	   request.assert('role','Role is required').notEmpty();
	   request.assert('Month', 'Month is required').notEmpty();
	   request.assert('Year', 'year is required').notEmpty();
	   request.assert('Description', 'Description is required').notEmpty();
	   

	   var errors = request.validationErrors();
	   console.log(errors);
	   //Additional tests
	   if(!errors){
	   // else if (request.body.email[-13] != '@colorado.edu') {
	   //    //Still Uncertain...
	   //    response.redirect('/registration');
	   // }
	      db.one('select max(userid) from usertable;').then(data => {
		 //Put the inputs into an object and 'clean' them
		 request.body.Profilephoto = encode(request.body.Profilephoto);
		 var item = {
		    userid: Number(data.max) + 1,   //Check db for current highest, +1
		    email: request.sanitize('email').escape().trim(),
		    graduation: request.sanitize('Month').escape().trim() + ' ' + request.sanitize('Year').escape().trim(),
		    photourl: request.sanitize('Profilephoto').escape().trim(),
		    displayname: request.sanitize('Name').escape().trim(),
		    description: request.sanitize('Description').escape().trim(),
		    verified: true,
		    password: request.sanitize('Password1').escape().trim(),
		    role: request.sanitize('role').escape().trim(),
		    major: request.sanitize('Major').escape().trim(),
		    hometown: request.sanitize('Hometown').escape().trim()
		 };
		 // Input items into database
		 console.log(item)
		 db.none('INSERT INTO UserTable(UserID, UserEmail, ExpectedGraduation, UserPhotoURL, Displayname, Description, Verified, Password, Role, Major, Hometown) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
			[item.userid, item.email, item.graduation, item.photourl, item.displayname, item.description, item.verified, item.password, item.role, item.major, item.hometown])
		    .then(function (result) {
			  //Now to insert Interests
			  if (request.body.Interests) {
			    let Interests = request.body.Interests;
                            if (Interests.len >1) 
			      Interests.forEach(function(id) {
			       db.none('INSERT INTO InterestTable(UserID, InterestID) VALUES($1, $2)',[item.userid, id]).catch(function (err) {console.log(err)})
			    })
                            } else {
			       db.none('INSERT INTO InterestTable(UserID, InterestID) VALUES($1, $2)',[item.userid, Interests]).catch(function (err) {console.log(err)})
                            }
			  
			  //Perform tasks for redirecting after successfully creating page
			  request.flash('success', 'Data added successfully!');
			  // render views/store/add.ejs
			  response.render('login/loginPage',{
			     title: 'User Created',
			     username: ''
			     })
		    }).catch(function (err) {
		       console.log('first catch: ' + err);
		       request.flash('error', err);
		 })
	      }).catch(function (err) {
		 console.log('second catch: ' + err);
		 request.flash('error',err);
	      })
	   }  
     else {
      var error_msg = errors.reduce((accumulator, current_error)=> accumulator + '<br/>' + current_error.msg, '');
      request.flash('error', error_msg);
      response.render('login/registration', {
          title: 'Registration Error',
          Name: request.body.Name,
          email: request.body.email,
          Password1: '',
          Password2: '',
          Major: request.body.Major,
          Month: request.body.Month,
          Year: request.body.Year,
          role: request.body.role,
          Hometown: request.body.Hometown,
          Description: request.body.Description,
          Profilephoto: request.body.Profilephoto
        }) 
       }
        })
     .catch(function(err) {
       request.body.email = null;
   
   request.assert('email', 'Invalid Email').notEmpty();
   var errors = request.validationErrors();
   var error_msg = errors.reduce((accumulator, current_error)=> accumulator + '<br/>' + current_error.msg, '');
   request.flash('error', error_msg);
   response.render('login/registration', {
       title: 'Registration Error',
       Name: request.body.Name,
       email: request.body.email,
       Password1: '',
       Password2: '',
       Major: request.body.Major,
       Month: request.body.Month,
       Year: request.body.Year,
       role: request.body.role,
       Hometown: request.body.Hometown,
       Description: request.body.Description,
       Profilephoto: request.body.Profilephoto
     })
    }) 
   
});

app.get('/success', function (request, response) {
   response.render('login/success', {
      title: "New Profile Creation Successful!"
   })
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


app.get('/logout', function(request, response) {
   request.logout();
   response.redirect('/');
})



module.exports = app;
