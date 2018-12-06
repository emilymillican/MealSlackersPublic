/* var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
]; */

/* var records = [
    {UserID: 1, UserEmail: 'test@gmail.com', Password:'test', Displayname:'Stian'},
    {UserID: 2, UserEmail: 'jack@gmail.com', Password:'secret', Displayname:'jack'}
]; */

var db = require('../database');

exports.findById = function(id, cb) {
  var query = 'SELECT * FROM UserTable where userid = $1;';
  db.one(query, id)
  .then(function (rows) {
    // console.log(rows);
    var records = rows;
    process.nextTick(function() {
      return cb(null, records);
    });
  })
  .catch(function (err) {
    console.log(err);
    return cb(null, null);
  })
}

/* exports.findByUsername = function(username, cb) {
  var query = 'SELECT * FROM UserTable where displayname = $1;';
  db.one(query, username)
  .then(function (rows) {
    // console.log(rows);
    var records = rows;
    process.nextTick(function() {
      return cb(null, records);
    });
  })
  .catch(function (err) {
    console.log(err);
    return cb(null, null);
  })
}; */

exports.findByEmail = function(email, cb) {
  var query = 'SELECT * FROM UserTable where UserEmail = $1;';
  db.one(query, email)
  .then(function (rows) {
    // console.log(rows);
    var records = rows;
    process.nextTick(function() {
      return cb(null, records);
    });
  })
  .catch(function (err) {
    console.log(err);
    return cb(null, null);
  })
};