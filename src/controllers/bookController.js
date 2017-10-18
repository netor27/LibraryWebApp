var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var url = require('../config/mongodb').url;

var bookController = function(bookService, nav) {
    var getIndex = function(req, res) {
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results) {
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
            });
        });
    };

    var getById = function(req, res) {
        var id = new objectId(req.params.id);
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({ _id: id }, function(err, result) {

                if (result.bookId) {
                    bookService.getBookById(result.bookId, function(err, book) {
                        result.book = book;
                        res.render('bookView', {
                            title: 'Book Detail',
                            nav: nav,
                            book: result
                        });
                    });
                }
                else {
                    res.render('bookView', {
                        title: 'Book',
                        nav: nav,
                        book: result
                    });
                }
            });
        });
    };

    var middleware = function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        else {
            next();
        }
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;
