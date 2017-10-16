var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
//var host = process.env.IP || 'localhost';

// mongo user
// dbuser
// M0nG0Us3rP4ssw0rd

// set the static directory
app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Authors'
}];

// initialize routers
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

// set the routers to the ap
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

// start server
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('running server on port ' + port);
    }
});
