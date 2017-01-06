var passport = require('passport');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(userId, done) {
        //mongo.find
        done(null, userId);
    });

    // local authentication
    require('./strategies/local.strategy')();
};