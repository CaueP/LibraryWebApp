var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookRouter = express.Router();

// function router to receive nav item
var router = function(nav) {

    // importing controller
    var bookController = require('../controllers/bookController')(null, nav);

    // secure all the routes, verifying if an user is authenticated before using any book route
    bookRouter.use(bookController.middleware);

    // Setting route for /Books
    bookRouter.route('/')
    // get method for /Books/ nd sending the json array of books
        .get(bookController.getIndex);

    // route to get a single book
    bookRouter.route('/:id')
    .get(bookController.getById);

    return bookRouter;
};

// exporting the book router
module.exports = router;