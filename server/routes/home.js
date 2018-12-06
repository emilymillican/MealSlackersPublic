/* Stian Howard */

var express = require('express');
var db = require('../database');
var app = express();
var cel = require('connect-ensure-login');


app.get('/', cel.ensureLoggedIn('/'), function (request, response) {

    var query = 'SELECT * FROM EventTable WHERE(date >= NOW()) ORDER BY date asc LIMIT 5'; //retriece all events today and into the future
    var user = request.user
    db.any(query)
      .then(function(rows) {
          //console.log(rows);
          //render home/index.ejs with events
          response.render('home/index', {
              title: 'Boulder Meal Slackerz Homepage',
              eventData: rows,
              userData: user
          })
    })
    .catch(function(err) {
        // display error message in case of error
        request.flash('error', err);
        response.render('home/index', {
            title: 'Boulder Meal Slackerz Error',
            eventData: '',
            userData: user
         })
     })
});

app.get('/createEvent', cel.ensureLoggedIn('/'), function (request, response) {
    //console.log(request.user)
    var user = request.user
    // render home/createEvent.ejs
    response.render('home/createEvent', {
        title: 'Create Event',
        userData: user
    })
});

//TODO: Add food support
//Also can't get the post requests to push through.... hm....
app.post('/addEvent', cel.ensureLoggedIn('/'), function (request, response) {
    //Check which values need to be included/ match requirements
    
    console.log(request.body.eventdate); //Trying to check format for the eventdate slot
    request.assert('eventname', 'Event Name is required').notEmpty();
    request.assert('eventdescription', 'A description is required').notEmpty();
    request.assert('eventdate', 'Date is required').notEmpty();
    request.assert('eventbuilding', 'Building is required').notEmpty();
    request.assert('eventroom', 'Room is required').notEmpty();
 
    var errors = request.validationErrors();
    console.log(errors); //errors to console
    if (!errors) {
       db.one('select max(eventid) from eventtable;').then(data => {
          //Put the inputs into an object and 'clean' them
          
          var item = {
             eventid: Number(data.max) + 1,   //Check db for current highest, +1
             eventdate: request.sanitize('eventdate').escape().trim(), //Might need format edits
             eventbuilding: request.sanitize('eventbuilding').escape().trim(),
             eventroom: request.sanitize('eventroom').escape().trim(),
             eventname: request.sanitize('eventname').escape().trim(),
             eventdescription: request.sanitize('eventdescription').escape().trim(),
             eventtype: 'test',
             userid: request.user.userid
          };
          // Input items into database
          db.none('INSERT INTO EventTable(EventID, Date, Building, RoomNumber, EventDisplayName, Description, EventType, UserID) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
                 [item.eventid, item.eventdate, item.eventbuilding, item.eventroom, item.eventname, item.eventdescription, item.eventtype, item.userid])
             .then(function (result) {
                   request.flash('success', 'Data added successfully!');
                   // render createEvent page with successful event creation
                   response.render('home/createEvent',{
                     title: 'Event Created',
                     userData: request.user
                   })
             }).catch(function (err) {
                request.flash('error', err);
                response.render('home/createEvent', {
                  title: 'Database Error',
                  userData: request.user
          })
       })
      })
    }
    else {
      var error_msg = errors.reduce((accumulator, current_error)=> accumulator + '<br/>' + current_error.msg, '');
      request.flash('error', error_msg);
      response.render('home/createEvent', {
          title: 'Input Error',
          userData: request.user
      })
    }
 });

app.get('/setting', cel.ensureLoggedIn('/'), function (request, response) {
    var user = request.user
    // render home/setting.ejs
    response.render('home/setting', {
        title: 'Profile Settings',
        userData: user
    })
});
// Route to insert values. Notice that request method is POST here
app.post('/add', cel.ensureLoggedIn('/'), function (request, response) {
    // Validate user input - ensure non emptiness
    request.assert('sname', 'sname is required').notEmpty();
    request.assert('qty', 'Quantity is required').notEmpty();
    request.assert('price', 'Price is required').notEmpty();

    var errors = request.validationErrors();
    if (!errors) { // No validation errors
        var item = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            sname: request.sanitize('sname').escape().trim(),
            qty: request.sanitize('qty').escape().trim(),
            price: request.sanitize('price').escape().trim()
        };
        // Running SQL query to insert data into the store table
        db.none('INSERT INTO store(sname, qty, price) VALUES($1, $2, $3)', [item.sname, item.qty, item.price])
            .then(function (result) {
                request.flash('success', 'Data added successfully!');
                // render views/store/add.ejs
                response.render('store/add', {
                    title: 'Add New Item',
                    sname: '',
                    qty: '',
                    price: ''
                })
            }).catch(function (err) {
            request.flash('error', err);
            // render views/store/add.ejs
            response.render('store/add', {
                title: 'Add New Item',
                sname: item.sname,
                qty: item.qty,
                price: item.price
            })
        })
    } else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        request.flash('error', error_msg);
        response.render('store/add', {
            title: 'Add New Item',
            sname: request.body.sname,
            qty: request.body.qty,
            price: request.body.price
        })
    }
});

app.get('/edit/(:id)', cel.ensureLoggedIn('/'),function (request, response) {
    // Fetch the id of the item from the request.
    var itemId = request.params.id;

    // TODO: Initialize the query variable with a SQL query
    // that returns all columns of an item whose id = itemId in the
    // 'store' table
    var query = 'SELECT * FROM store WHERE id = $1',itemId;
    db.one(query)
        .then(function (row) {
            // if item not found
            if (row.length === 0) {
                request.flash('error', 'Item not found with id = ' + request.params.id);
                response.redirect('/store')
            }
            else {
                response.render('store/edit', {
                    title: 'Edit Item',
                    id: row.id,
                    qty: row.qty,
                    price: row.price,
                    sname: row.sname
                })
            }
        })
        .catch(function (err) {
            request.flash('error', err);
            response.render('store/list', {
                title: 'Store listing',
                data: ''
            })
        })
});

// Route to update values. Notice that request method is PUT here
app.put('/edit/(:id)', cel.ensureLoggedIn('/'), function (req, res) {
    // Validate user input - ensure non emptiness
    req.assert('sname', 'Name is required').notEmpty();
    req.assert('qty', 'Quantity is required').notEmpty();
    req.assert('price', 'Price is required').notEmpty();

    var errors = req.validationErrors();
    if (!errors) { // No validation errors
        var item = {
            // sanitize() is a function used to prevent Hackers from inserting
            // malicious code(as data) into our database. There by preventing
            // SQL-injection attacks.
            sname: req.sanitize('sname').escape().trim(),
            qty: req.sanitize('qty').escape().trim(),
            price: req.sanitize('price').escape().trim()
        };

        // Fetch the id of the item from the request.
        var itemId = req.params.id;

        // TODO: Initialize the updateQuery variable with a SQL query
        // that updates the details of an item given its id
        // in the 'store' table
        var updateQuery = 'UPDATE store SET sname = $1, qty = $2, price = $3 WHERE id = $4;';

        // Running SQL query to insert data into the store table
        db.none(updateQuery, [item.sname, item.qty, item.price, itemId])
            .then(function (result) {
                req.flash('success', 'Data updated successfully!');
                res.redirect('/store');
            })
            .catch(function (err) {
                req.flash('error', err);
                res.render('store/edit', {
                    title: 'Edit Item',
                    id: req.params.id,
                    sname: req.body.sname,
                    qty: req.body.qty,
                    price: req.body.price
                })
            })
    }
    else {
        var error_msg = errors.reduce((accumulator, current_error) => accumulator + '<br />' + current_error.msg, '');
        req.flash('error', error_msg);
        res.render('store/edit', {
            title: 'Edit Item,',
            id: req.body.id,
            sname: req.body.sname,
            qty: req.body.qty,
            price: req.body.price
        })
    }
});

// Route to delete an item. Notice that request method is DELETE here
app.delete('/delete/(:id)', cel.ensureLoggedIn('/'), function (req, res) {
    // Fetch item id of the item to be deleted from the request.
    var itemId = req.params.id;

    // TODO: Initialize the deleteQuery variable with a SQL query
    // that deletes an item whose id = itemId in the
    // 'store' table
    var deleteQuery = 'DELETE FROM store WHERE id = $1';
    db.none(deleteQuery, itemId)
        .then(function (result) {
                  req.flash('success', 'successfully deleted it');
                  res.redirect('/store');
        })
        .catch(function (err) {
                   req.flash('error', err);
                   res.redirect('/store')
        })
});


module.exports = app;
