var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var host = process.env.IP || 'localhost';

// set the static directory
app.use(express.static('public'));
app.use(express.static('src/views'));

// set the routes
app.get('/', function(req, res){
    res.send('Hello World!');
});

app.get('/books', function(req, res){
    res.send('Hello Books!');
});

app.listen(port, host, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('running server on port ' + port);
    }
});