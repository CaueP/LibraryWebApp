var express = require('express');
var mongodb = require('mongodb').MongoClient;
var adminRouter = express.Router();

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

var router = function() {

    adminRouter.route('/addBooks')
        .get(function(req, res) {
            // mongodb server url
            var url = 'mongodb://localhost:27017/libraryApp';

            // connect to the database
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    adminRouter.route('/rmBooks')
        .get(function(req, res) {
            // mongodb server url
            var url = 'mongodb://localhost:27017/libraryApp';

            // connect to the database
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.remove({}, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;
};

module.exports = router;