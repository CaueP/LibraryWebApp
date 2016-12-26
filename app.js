var express = require('express');

// gives an instance of express
var app = express();

// listening port
var port = process.env.PORT || 5000;

/*
    setting up the middleware
*/
// setting the public directory for static files
app.use(express.static('public'));

// setting the views directory
//app.use(express.static('src/views'));
app.set('views', './src/views');
// setting ejs as the view engine
app.set('view engine', 'ejs');

/*
    setting the routes
*/
// GET route for /
app.get('/', function (req, res) {
    // res.send('Hello world');
    res.render('index', {title: 'Hello from render',lista: ['a', 'b']});
});

// GET route for /books
app.get('/books', function (req, res) {
    res.send('Hello books');
});

// setting express to listen o the specified port
app.listen(port, function (err) {
    console.log('running server on port ' + port);
});