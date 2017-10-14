var express = require('express');

var app = express();

// If running in cloud9
var port = process.env.PORT;
var host = process.env.IP;

// If running in localhost
// var port = 5000;
// var host = 'localhost';

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
        console.log(err)
    }else{
        console.log('running server on port ' + port);
    }
});