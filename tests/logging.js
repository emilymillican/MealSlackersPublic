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
    .expect('Content-Type', 'text/html')
    .expect(302)
    .end(function(err, response){
      expect(response.statusCode).to.equal(302);
      expect('Location', '/home');
      done();
    });
});

describe('GET /home', function(done){
//addresses 1st bullet point: if the user is logged in we should get a 200 status code
  it('should return a 200 response if the user is logged in', function(done){
    authenticatedUser.get('/home')
    .expect(200, done);
  });
//addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
  it('should return a 302 response and redirect to /login', function(done){
    request(app).get('/home')
    .expect('Location', '/')
    .expect(302, done);
  });
});

describe('GET /home/createEvent', function(done){
//addresses 1st bullet point: if the user is logged in we should get a 200 status code
  it('should return a 200 response if the user is logged in', function(done){
    authenticatedUser.get('/home/createEvent')
    .expect(200, done);
  });
//addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
  it('should return a 302 response and redirect to /login', function(done){
    request(app).get('/home/createEvent')
    .expect('Location', '/')
    .expect(302, done);
  });
});


describe('GET /home/setting', function(done){
//addresses 1st bullet point: if the user is logged in we should get a 200 status code
  it('should return a 200 response if the user is logged in', function(done){
    authenticatedUser.get('/home/setting')
    .expect(200, done);
  });
//addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
  it('should return a 302 response and redirect to /login', function(done){
    request(app).get('/home/setting')
    .expect('Location', '/')
    .expect(302, done);
  });
});
