/* var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
]; */

var records = [
    {UserID: 1, UserEmail: 'test@gmail.com', Password:'test', Displayname:'Stian'},
    {UserID: 2, UserEmail: 'jack@gmail.com', Password:'secret', Displayname:'jack'}
];

var db = require('../database');

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByDisplayname = function(displayname, cb) {
/*   var query = 'SELECT * FROM UserTable where $1 = Displayname;';
  db.any(query, displayname)
  .then(function (rows) {
    var records = rows;
    process.nextTick(function() {
      for (var i = 0, len = records.length; i < len; i++) {
        var record = records[i];
        if (record.username === username) {
          return cb(null, record);
        }
      }
      return cb(null, null);
    });
  })
  .catch(function (err) {
    console.log(err);
    //Figure out how the hell to handle this error of not return good data
    //Probably return it as a null or something like that, then let passport deal with it
    //along with a console.log of the error
  }) */

  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

exports.findByEmail = function(email, cb) {
  var query = 'SELECT * FROM UserTable where ;';
  db.one(query)
  .then(function (rows) {
    var records = rows;
    process.nextTick(function() {
      for (var i = 0, len = records.length; i < len; i++) {
        var record = records[i];
        if (record.UserEmail === email) {
          return cb(null, record);
        }
      }
      return cb(null, null);
    });
  })
  .catch(function (err) {
    console.log(err);
    return cb(null, null);
    //Figure out how the hell to handle this error of not return good data
    //Probably return it as a null or something like that, then let passport deal with it
    //along with a console.log of the error
  })
}

exports.findByUsername = function(username, cb) {

  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.Displayname === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};