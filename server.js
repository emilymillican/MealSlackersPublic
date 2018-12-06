/* Stian Howard */

var express = require('express');


// Authentication Attempt

var passport = require('passport');

require('./conf/auth');

var app = express();

app.set('view engine', 'ejs');

var expressValidator = require('express-validator');
app.use(expressValidator());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('csci3308'));
app.use(session({
    secret: 'csci3308',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 300000}
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./css'));
var login = require('./routes/login');
var home = require('./routes/home');
app.use('/', login);
app.use('/home', home);

var port = 4000;
app.listen(port, function () {
    console.log('Server running on http://localhost:' + port)
});
