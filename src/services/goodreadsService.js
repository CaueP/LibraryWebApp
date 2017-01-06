var goodreadsService = function() {
    var getBookById = function(id, cb) {
        cb(null, {description: 'Our description'});
    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;