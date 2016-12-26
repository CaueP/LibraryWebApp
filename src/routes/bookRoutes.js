var express = require('express');

var bookRouter = express.Router();

// function router to receive nav item
var router = function(nav) {

    // Mocked array of Book data
    var books = [
        {
            title: 'War and Peace',
            author: 'Lev Tolstoy'
        },
        {
            title: 'Harry Potter 1',
            author: 'JK Rolling'
        },
        {
            title: 'Lord of the Rings',
            author: 'Tolkien'
        },
        {
            title: 'Memórias Póstumas de Brás Cubas',
            author: 'Machado de Assis'
        }
    ];

    // Setting route for /Books
    bookRouter.route('/')
    // get method for /Books/ nd sending the json array of books
        .get(function(req, res) {
            res.render('bookListView', {
                title: 'Hello from render',
                nav: nav,
                books: books
            });
        });

    // route to get a single book
    bookRouter.route('/:id')
    .get(function (req, res) {
        // get requested object id
        var id = req.params.id;

        // render the page with the book associated to the id
        res.render('bookView', {
            title: 'Hello from render',
            nav: nav,
            book: books[id]
        });
    });

    return bookRouter;
};

// exporting the book router
module.exports = router;