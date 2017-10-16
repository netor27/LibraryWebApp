var express = require('express');

var bookRouter = express.Router();

var router = function(nav) {
    // hardcoded books
    var books = [{
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'Les Misérables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false
        },
        {
            title: 'The Time Machine',
            genre: 'Science Fiction',
            author: 'H. G. Wells',
            read: false
        },
        {
            title: 'A Journey into the Center of the Earth',
            genre: 'Science Fiction',
            author: 'Jules Verne',
            read: false
        },
        {
            title: 'The Dark World',
            genre: 'Fantasy',
            author: 'Henry Kuttner',
            read: false
        },
        {
            title: 'The Wind in the Willows',
            genre: 'Fantasy',
            author: 'Kenneth Grahame',
            read: false
        },
        {
            title: 'Life On The Mississippi',
            genre: 'History',
            author: 'Mark Twain',
            read: false
        },
        {
            title: 'Childhood',
            genre: 'Biography',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        }
    ];

    // set the routes
    bookRouter.route('/')
        .get(function(req, res) {
            res.render('bookListView', {
                title: 'Hello from render',
                nav: nav,
                books: books
            });
        });
    bookRouter.route('/:id')
        .get(function(req, res) {

            res.render('bookView', {
                title: 'Hello from render',
                nav: nav,
                book: books[req.params.id]
            });
        });

    return bookRouter;
};

module.exports = router;
