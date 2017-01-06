var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var authRouter = express.Router();

var router = function() {

    // sign up route
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);

            // mongodb server url
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function(err, db) {
                // uses 'users' collection, if it doesn't exists, creates automatically
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                // insert new user on the database and then login
                collection.insert(user, function (err, results) {
                    // function to login user on the session just after signup
                    req.login(req.body, function() {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

    // sign in route
    authRouter.route('/signIn')
        // authenticate using passport with local strategy
        .post(passport.authenticate('local',
            {failureRedirect: '/'}),    // if it fails, go back to slash
            // if succeed
            function(req, res) {
                res.redirect('/auth/profile');
        });

    // profile route
    authRouter.route('/profile')
    .get(function(req, res) {
        res.json(req.user);
    });

    return authRouter;
};

module.exports = router;