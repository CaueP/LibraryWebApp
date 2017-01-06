var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;


module.exports = function() {
    // setting Local Strategy and name for username and password field on the Form
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {    // callback receiver
        // mongodb server url
        var url = 'mongodb://localhost:27017/libraryApp';

        // check user on Mongo
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('users');
            // find user by username
            collection.findOne(
                {username: username},
                // when get the results
                function (err, results) {
                    // check password
                    if (results.password === password) {
                        var user = results;
                        done(null, user);   // callback for success
                    } else {    // wrong password
                        //done('Bad password', null);
                        done(null, false);  // passing error in order to return to '/', as set on authRoutes.js
                    }
                });
        });
    }));

};