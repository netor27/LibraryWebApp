var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var url = require('../config/mongodb').url;

var router = function(nav) {

    bookRouter.use(function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        else {
            next();
        }
    });

    bookRouter.route('/')
        .get(function(req, res) {
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
