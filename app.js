// routes package
var express = require('express');
// package to parse the body of a request into a JSON object
var bodyParser = require('body-parser');
// cookie parser to store user information
var cookieParser = require ('cookie-parser');
// authentication library
var passport = require ('passport');
// express library to use with passport
var session = require ('express-session');

// gives an instance of express
var app = express();

// listening port
var port = process.env.PORT || 5000;

// nav bar items
var nav = [
    {
        Link: '/Books',
        Text: 'Book'
    }
];

// importing routes
// passing nav array of items
var bookRouter = require('./src/routes/bookRoutes.js')(nav);
var adminRouter = require('./src/routes/adminRoutes.js')();
var authRouter = require('./src/routes/authRoutes.js')();

/*
    setting up the middleware
*/
// setting the public directory for static files
app.use(express.static('public'));

// parse application/json (parse the body into req.body for json encoded)
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded (parse the body into req.body for url encoded)
app.use(bodyParser.urlencoded({extended: false}));
// use cookie parser
app.use(cookieParser());
// use session
app.use(session({secret: 'library'}));
// use passport
app.use(passport.initialize());
app.use(passport.session());
// config passport
require('./src/config/passport')(app);

// setting the views directory
app.set('views', './src/views');
// setting ejs as the view engine
app.set('view engine', 'ejs');

// using the routes
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

/*
    setting the routes
*/

// GET route for /
app.get('/', function (req, res) {
    // rendering the index page, sending a json with the title and navigation items
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

// GET route for /books
app.get('/books', function (req, res) {
    res.send('Hello books');
});

// setting express to listen o the specified port
app.listen(port, function (err) {
    console.log('running server on port ' + port);
});