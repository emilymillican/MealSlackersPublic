var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest');

//let's set up the data we need to pass to the login method
const userCredentials = {
    username: 'Stian@colorado.edu', 
    password: 'irock'
}



var authenticatedUser = request.agent(app);
before(function(done){
  authenticatedUser
    .post('/login')
    .send(userCredentials)
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      expect('Location', '/home');
      done();
    });
});