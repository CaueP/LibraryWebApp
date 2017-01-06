var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {

    var middleware = function(req, res, next) {
        /*if (!req.user) {
            res.redirect('/');
        }*/
        next();
    };

    var getIndex = function(req, res) {

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
        };

    var getById = function (req, res) {
        // get requested object id
        var id = new ObjectId(req.params.id);

        // mongodb server url
        var url = 'mongodb://localhost:27017/libraryApp';

        // connect to the database
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');

            // getting the collection of books and converting to JS array
            collection.findOne({_id: id},
                function(err, results) {    // callback from MongoDB findOne
                    bookService.getBookById(results.bookId, // calling our bookService
                        function(err, book) {
                            results.book = book;    // appending our book description
                            res.render('bookView', {
                                title: 'Books',
                                nav: nav,
                                book: results
                            });
                        });
                });
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;