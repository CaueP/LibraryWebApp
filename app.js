var express = require('express');

// gives an instance of express
var app = express();

// listening port
var port = 5000;

// GET route for /
app.get('/', function(req, res){
    res.send('Hello world');
})

// GET route for /books
app.get('/books', function(req, res){
    res.send('Hello books');
})

// setting express to listen o the specified port
app.listen(port, function(err){
    console.log('running server on port ' + port);
});