var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    // setting Local Strategy and name for username and password field on the Form
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {    // callback receiver
        // check user
        var user = {
            username: username,
            password: password
        };
        done(null, user);   // callback
    }));

};