var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookRouter = express.Router();

// function router to receive nav item
var router = function(nav) {

    // Setting route for /Books
    bookRouter.route('/')
    // get method for /Books/ nd sending the json array of books
        .get(function(req, res) {

            // mongodb server url
            var url = 'mongodb://localhost:27017/libraryApp';

            // connect to the database
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');

                // getting the collection of books and converting to JS array
                collection.find({}).toArray(function(err, results) {
                    res.render('bookListView', {
                        title: 'Hello from render',
                        nav: nav,
                        books: results
                    });
                });
            });
        });

    // route to get a single book
    bookRouter.route('/:id')
    .get(function (req, res) {
        // get requested object id
        var id = new objectId(req.params.id);

        // mongodb server url
        var url = 'mongodb://localhost:27017/libraryApp';

        // connect to the database
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');

            // getting the collection of books and converting to JS array
            collection.findOne({_id: id},
                function(err, results) {
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: results
                    });
                });
        });
    });

    return bookRouter;
};

// exporting the book router
module.exports = router;