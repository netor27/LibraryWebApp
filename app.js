var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5000;
//var host = process.env.IP || 'localhost';

// mongo user for dev and test purposes
// dbuser
// M0nG0Us3rP4ssw0rd

// set the static directory
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
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
var authRouter = require('./src/routes/authRoutes')(nav);

// set the routers to the ap
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Index',
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
