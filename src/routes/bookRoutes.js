var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function(nav) {

    bookRouter.route('/')
        .get(function(req, res) {
            var url = 'mongodb://dbuser:M0nG0Us3rP4ssw0rd@ds119345.mlab.com:19345/library-db';
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
        });

    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = new objectId(req.params.id);
            var url = 'mongodb://dbuser:M0nG0Us3rP4ssw0rd@ds119345.mlab.com:19345/library-db';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.findOne({ _id: id }, function(err, result) {
                    res.render('bookView', {
                        title: 'Book',
                        nav: nav,
                        book: result
                    });
                });
            });
        });

    return bookRouter;
};

module.exports = router;
